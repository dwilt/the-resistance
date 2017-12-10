"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.voteForMission = exports.voteForMissionTeam = exports.setMissionTeam = exports.startGame = exports.createGame = exports.quitGame = exports.joinGame = exports.joinGameErrors = void 0;

var _gameStructure = require("./gameStructure");

var _lodash = require("lodash");

var _helpers = require("./helpers");

let startNewRound =
/*#__PURE__*/
(() => {
  var _ref = _asyncToGenerator(function* (gameId) {
    return Promise.all([(0, _helpers.updateGame)(gameId, {
      state: _gameStructure.gameStates.LEADER_ASSEMBLE_TEAM,
      missionTeam: null,
      missionTeamVotes: null
    }), setNewLeader(gameId)]);
  });

  return function startNewRound(_x) {
    return _ref.apply(this, arguments);
  };
})();

let setNewLeader =
/*#__PURE__*/
(() => {
  var _ref2 = _asyncToGenerator(function* (gameId) {
    const [game, playersDocs] = yield Promise.all([(0, _helpers.getGame)(gameId), (0, _helpers.getPlayers)(gameId)]);
    const players = playersDocs.map(doc => doc.id);
    const {
      previousLeaders = []
    } = game;
    const refreshLeaders = previousLeaders.length === players.length;
    const potentialLeaders = refreshLeaders ? players : (0, _lodash.difference)(players, previousLeaders);
    const leader = (0, _lodash.sampleSize)(potentialLeaders, 1)[0];
    const newPreviousLeaders = refreshLeaders ? [leader] : [...previousLeaders, leader];
    yield (0, _helpers.updateGame)(gameId, {
      previousLeaders: newPreviousLeaders,
      [`currentMission.leader`]: leader
    });
  });

  return function setNewLeader(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

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
  var _ref3 = _asyncToGenerator(function* (userId, gameCode) {
    const game = yield (0, _helpers.getOpenGameByCode)(gameCode);

    if (game) {
      const gameId = game.id;
      const player = yield (0, _helpers.getPlayer)(gameId, userId);

      if (!player.exists) {
        const userDoc = yield (0, _helpers.getUser)(userId);
        const {
          name
        } = userDoc.data();
        yield (0, _helpers.addPlayer)(gameId, userId, name);
      }

      return gameId;
    } else {
      return Promise.reject(joinGameErrors.GAME_DOES_NOT_EXIST);
    }
  });

  return function joinGame(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
})();

exports.joinGame = joinGame;

let quitGame =
/*#__PURE__*/
(() => {
  var _ref4 = _asyncToGenerator(function* (gameId, playerId) {
    yield (0, _helpers.deletePlayer)(gameId, playerId);
    const players = yield (0, _helpers.getPlayers)(gameId);

    if (!players.length) {
      (0, _helpers.deleteGame)(gameId);
    }
  });

  return function quitGame(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
})();

exports.quitGame = quitGame;

let createGame =
/*#__PURE__*/
(() => {
  var _ref5 = _asyncToGenerator(function* (userId) {
    // TODO: come up with better, safer code generation lol
    const gameCode = Math.floor(Math.random() * 900000) + 100000;
    yield (0, _helpers.addGame)({
      gameCode,
      host: userId,
      state: _gameStructure.gameStates.LOBBY
    });
    const gameId = yield joinGame(userId, gameCode);
    return {
      gameCode,
      gameId
    };
  });

  return function createGame(_x7) {
    return _ref5.apply(this, arguments);
  };
})();

exports.createGame = createGame;

let startGame =
/*#__PURE__*/
(() => {
  var _ref6 = _asyncToGenerator(function* (gameId) {
    const playersDocs = yield (0, _helpers.getPlayers)(gameId);
    const totalSpies = (0, _gameStructure.getSpyCount)(playersDocs.length);
    const spies = (0, _lodash.sampleSize)(playersDocs, totalSpies);
    return Promise.all([...playersDocs.map(doc => (0, _helpers.updatePlayer)(gameId, doc.id, {
      isSpy: spies.indexOf(doc) !== -1
    })), startNewRound(gameId)]);
  });

  return function startGame(_x8) {
    return _ref6.apply(this, arguments);
  };
})();

exports.startGame = startGame;

let setMissionTeam =
/*#__PURE__*/
(() => {
  var _ref7 = _asyncToGenerator(function* (gameId, missionTeamIds = []) {
    const missionTeam = missionTeamIds.reduce((team, id) => {
      team[id] = null;
      return team;
    }, {});
    yield (0, _helpers.updateGame)(gameId, {
      state: _gameStructure.gameStates.MISSION_TEAM_VOTE,
      [`currentMission.missionTeam`]: missionTeam
    });
  });

  return function setMissionTeam(_x9) {
    return _ref7.apply(this, arguments);
  };
})();

exports.setMissionTeam = setMissionTeam;

let voteForMissionTeam =
/*#__PURE__*/
(() => {
  var _ref8 = _asyncToGenerator(function* ({
    gameId,
    userId,
    approves
  }) {
    yield (0, _helpers.updateGame)(gameId, {
      [`currentMission.missionTeamVotes.${userId}`]: approves
    });
    const [playersDocs, game] = yield Promise.all([(0, _helpers.getPlayers)(gameId), (0, _helpers.getGame)(gameId)]);
    const totalPlayers = playersDocs.length;
    const {
      currentMission: {
        missionTeamVotes,
        leader,
        missionTeam,
        failedTeams = []
      }
    } = game;
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
      yield (0, _helpers.updateGame)(gameId, {
        state: _gameStructure.gameStates.CONDUCT_MISSION
      });
    } else if (rejectedVotes >= majority || isTied) {
      if (failedTeams.length >= 4) {
        yield (0, _helpers.updateGame)(gameId, {
          state: _gameStructure.gameStates.COMPLETED
        });
      } else {
        const failedTeam = {
          leader,
          missionTeam,
          missionTeamVotes
        };
        yield Promise.all([(0, _helpers.updateGame)(gameId, {
          state: _gameStructure.gameStates.LEADER_ASSEMBLE_TEAM,
          [`currentMission.missionTeamVotes`]: null,
          [`currentMission.failedTeams`]: [...failedTeams, failedTeam]
        }), setNewLeader(gameId)]);
      }
    }
  });

  return function voteForMissionTeam(_x10) {
    return _ref8.apply(this, arguments);
  };
})();

exports.voteForMissionTeam = voteForMissionTeam;

let voteForMission =
/*#__PURE__*/
(() => {
  var _ref9 = _asyncToGenerator(function* ({
    gameId,
    userId,
    succeeds
  }) {
    yield (0, _helpers.updateGame)(gameId, {
      [`currentMission.missionTeam.${userId}`]: succeeds
    });
    const {
      currentMission
    } = yield (0, _helpers.getGame)(gameId);
    const {
      missionTeam
    } = currentMission;
    const nonVoters = Object.keys(missionTeam).filter(userId => missionTeam[userId] === null);

    if (!nonVoters.length) {
      const [completedMissionsDocs, playersDocs] = yield Promise.all([(0, _helpers.getCompletedMissions)(gameId), (0, _helpers.getPlayers)(gameId)]);
      const roundNumber = completedMissionsDocs.length;
      const totalPlayers = playersDocs.length;
      const failedVotes = Object.keys(missionTeam).filter(userId => missionTeam[userId] === false);
      const missionFailed = roundNumber === 4 && totalPlayers > 7 ? failedVotes.length > 1 : !!failedVotes.length; // TODO: convert to spread when you figure out wtf is going on

      yield (0, _helpers.addCompletedMission)(gameId, Object.assign({}, {
        missionFailed
      }, currentMission));

      if (roundNumber === _gameStructure.totalRounds) {
        yield (0, _helpers.updateGame)(gameId, {
          state: _gameStructure.gameStates.COMPLETED
        });
      } else {
        yield startNewRound(gameId);
      }
    }
  });

  return function voteForMission(_x11) {
    return _ref9.apply(this, arguments);
  };
})();

exports.voteForMission = voteForMission;