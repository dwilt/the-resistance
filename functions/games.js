"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.voteForMission = exports.voteForMissionTeam = exports.setMissionTeam = exports.startGame = exports.createGame = exports.quitGame = exports.joinGame = exports.joinGameErrors = void 0;

var _gameStructure = require("./gameStructure");

var _lodash = require("lodash");

let setNewLeader =
/*#__PURE__*/
(() => {
  var _ref = _asyncToGenerator(function* (gameId) {
    const [gameDoc, playersSnapshot] = yield Promise.all([admin.firestore().collection(`games`).doc(gameId).get(), admin.firestore().collection(`games`).doc(gameId).collection(`players`).get()]);
    const players = playersSnapshot.docs.map(doc => doc.data().id);
    const {
      previousLeaders = []
    } = gameDoc.data();
    let leader = null;

    if (previousLeaders.length === players.length) {
      leader = (0, _lodash.sampleSize)(players, 1)[0];
      yield gameDoc.ref.update({
        previousLeaders: [leader]
      });
    } else {
      const remainingPotentialLeaders = (0, _lodash.difference)(players, previousLeaders);
      leader = (0, _lodash.sampleSize)(remainingPotentialLeaders, 1)[0];
      yield gameDoc.ref.update({
        previousLeaders: [...previousLeaders, leader]
      });
    }

    gameDoc.ref.update({
      leader
    });
  });

  return function setNewLeader(_x) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const functions = require("firebase-functions");

const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
const joinGameErrors = {
  GAME_DOES_NOT_EXIST: {
    code: `GAME_DOES_NOT_EXIST`,
    message: `No open game exists with that code`
  }
};
exports.joinGameErrors = joinGameErrors;

let joinGame =
/*#__PURE__*/
(() => {
  var _ref2 = _asyncToGenerator(function* (userId, gameCode) {
    const {
      docs: gameDocs
    } = yield admin.firestore().collection(`games`).where(`gameCode`, `==`, parseInt(gameCode)).where(`state`, `==`, _gameStructure.gameStates.LOBBY).get();

    if (gameDocs.length) {
      const game = gameDocs[0];
      const gameId = game.id;
      const {
        docs: existingUserDoc
      } = yield game.ref.collection(`players`).where(`id`, `==`, userId).get(); // if the user isn't already in the game, add them

      if (!existingUserDoc.length) {
        const userDoc = yield admin.firestore().collection(`users`).doc(userId).get();
        const {
          name
        } = userDoc.data();
        yield game.ref.collection(`players`).add({
          name,
          id: userId
        });
      }

      return gameId;
    } else {
      return Promise.reject(joinGameErrors.GAME_DOES_NOT_EXIST);
    }
  });

  return function joinGame(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
})();

exports.joinGame = joinGame;

let quitGame =
/*#__PURE__*/
(() => {
  var _ref3 = _asyncToGenerator(function* (userId, gameId) {
    const playerQuerySnapshot = yield admin.firestore().collection(`games`).doc(gameId).collection(`players`).where(`id`, `==`, userId).get();
    const player = playerQuerySnapshot.docs[0];
    yield player.ref.delete(); // check if player was last player in game - if so, delete game
    // not returning because this is a server-job and client shouldn't wait for it to complete

    if (playerQuerySnapshot.docs.length === 1) {
      admin.firestore().collection(`games`).doc(gameId).delete();
    }
  });

  return function quitGame(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
})();

exports.quitGame = quitGame;

let createGame =
/*#__PURE__*/
(() => {
  var _ref4 = _asyncToGenerator(function* (userId) {
    const gameCode = Math.floor(Math.random() * 900000) + 100000;
    const newGame = {
      gameCode,
      host: userId,
      state: _gameStructure.gameStates.LOBBY
    };
    yield admin.firestore().collection(`games`).add(newGame);
    const gameId = yield joinGame(userId, gameCode);
    return {
      gameCode,
      gameId
    };
  });

  return function createGame(_x6) {
    return _ref4.apply(this, arguments);
  };
})();

exports.createGame = createGame;

let startGame =
/*#__PURE__*/
(() => {
  var _ref5 = _asyncToGenerator(function* (gameId) {
    const [playersSnapshot] = yield Promise.all([admin.firestore().collection(`games`).doc(gameId).collection(`players`).get(), admin.firestore().collection(`games`).doc(gameId).update({
      state: `PLAYER_REVEAL`
    })]);
    const totalSpies = _gameStructure.spyCount[playersSnapshot.docs.length];
    const spies = (0, _lodash.sampleSize)(playersSnapshot.docs, totalSpies);
    return Promise.all([admin.firestore().collection(`games`).doc(gameId).update({
      state: _gameStructure.gameStates.PLAYER_REVEAL
    }), ...playersSnapshot.docs.map(doc => doc.ref.update({
      isSpy: spies.indexOf(doc) !== -1
    }), setNewLeader(gameId))]);
  });

  return function startGame(_x7) {
    return _ref5.apply(this, arguments);
  };
})();

exports.startGame = startGame;

let setMissionTeam =
/*#__PURE__*/
(() => {
  var _ref6 = _asyncToGenerator(function* (gameId, missionTeamIds = []) {
    const missionTeam = {};
    missionTeamIds.forEach(id => missionTeam[id] = null);
    yield admin.firestore().collection(`games`).doc(gameId).update({
      state: _gameStructure.gameStates.MISSION_TEAM_VOTE,
      missionTeam
    });
  });

  return function setMissionTeam(_x8) {
    return _ref6.apply(this, arguments);
  };
})();

exports.setMissionTeam = setMissionTeam;

let voteForMissionTeam =
/*#__PURE__*/
(() => {
  var _ref7 = _asyncToGenerator(function* ({
    gameId,
    userId,
    approves
  }) {
    yield admin.firestore().collection(`games`).doc(gameId).update({
      [`missionTeamVotes.${userId}`]: approves
    });
    const [playersSnapshot, gameDoc] = yield Promise.all([admin.firestore().collection(`games`).doc(gameId).collection(`players`).get(), admin.firestore().collection(`games`).doc(gameId).get()]);
    const totalPlayers = playersSnapshot.docs.length;
    const {
      missionTeamVotes
    } = gameDoc.data();
    const majority = totalPlayers % 2 === 0 ? totalPlayers / 2 + 1 : Math.ceil(totalPlayers / 2);
    let approvedVotes = 0;
    let rejectedVotes = 0;
    Object.keys(missionTeamVotes).forEach(userId => {
      const approved = missionTeamVotes[userId];

      if (approved) {
        approvedVotes += 1;
      } else {
        rejectedVotes += 1;
      }
    });
    const isTied = approvedVotes + rejectedVotes === totalPlayers && approvedVotes === rejectedVotes;

    if (approvedVotes >= majority) {
      yield admin.firestore().collection(`games`).doc(gameId).update({
        state: _gameStructure.gameStates.CONDUCT_MISSION
      });
    } else if (rejectedVotes >= majority || isTied) {
      const gameDoc = yield admin.firestore().collection(`games`).doc(gameId).get();
      const {
        leader,
        missionTeam
      } = gameDoc.data();
      yield gameDoc.ref.collection(`failedTeamAssembles`).add({
        leader,
        missionTeam,
        missionTeamVotes
      });
      const updatedGameDoc = yield admin.firestore().collection(`games`).doc(gameId).get();
      const {
        failedTeamAssembles = []
      } = updatedGameDoc.data();

      if (failedTeamAssembles.length >= 5) {
        yield admin.firestore().collection(`games`).doc(gameId).update({
          state: _gameStructure.gameStates.COMPLETED
        });
      } else {
        yield Promise.all([admin.firestore().collection(`games`).doc(gameId).update({
          state: _gameStructure.gameStates.LEADER_ASSEMBLE_TEAM,
          missionTeamVotes: {}
        }), setNewLeader(gameId)]);
      }
    }
  });

  return function voteForMissionTeam(_x9) {
    return _ref7.apply(this, arguments);
  };
})();

exports.voteForMissionTeam = voteForMissionTeam;

let voteForMission =
/*#__PURE__*/
(() => {
  var _ref8 = _asyncToGenerator(function* ({
    gameId,
    userId,
    succeeds
  }) {
    yield admin.firestore().collection(`games`).doc(gameId).update({
      [`missionTeam.${userId}`]: succeeds
    });
    const gameDoc = yield admin.firestore().collection(`games`).doc(gameId).get();
    const {
      missionTeam
    } = gameDoc.data();
    const nonVoters = Object.keys(missionTeam).filter(userId => missionTeam[userId] === null);

    if (nonVoters.length) {}
  });

  return function voteForMission(_x10) {
    return _ref8.apply(this, arguments);
  };
})();

exports.voteForMission = voteForMission;