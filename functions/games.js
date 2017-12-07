"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startGame = exports.startGameErrors = exports.createGame = exports.createGameErrors = exports.quitGame = exports.quitGameErrors = exports.joinGame = exports.joinGameErrors = void 0;

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
  var _ref = _asyncToGenerator(function* (userId, gameCode) {
    const {
      docs: gameDocs
    } = yield admin.firestore().collection(`games`).where(`gameCode`, `==`, parseInt(gameCode)).where(`state`, `==`, `OPEN`).get();

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
      // TODO: Track/log this error somehow
      return Promise.reject(joinGameErrors.GAME_DOES_NOT_EXIST);
    }
  });

  return function joinGame(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

exports.joinGame = joinGame;
const quitGameErrors = {
  PLAYER_DOES_NOT_EXIST: {
    code: `PLAYER_DOES_NOT_EXIST`,
    message: `Player doesn't exist in this game`
  },
  GAME_DOES_NOT_EXIST: {
    code: `GAME_DOES_NOT_EXIST`,
    message: `This game doesn't exist`
  }
};
exports.quitGameErrors = quitGameErrors;

let quitGame =
/*#__PURE__*/
(() => {
  var _ref2 = _asyncToGenerator(function* (userId, gameId) {
    const gameDoc = yield admin.firestore().collection(`games`).doc(gameId).get();

    if (gameDoc.exists) {
      const playerQuerySnapshot = yield gameDoc.ref.collection(`players`).where(`id`, `==`, userId).get();

      if (playerQuerySnapshot.docs.length) {
        const player = playerQuerySnapshot.docs[0];
        yield player.ref.delete(); // check if player was last player in game - if so, delete game
        // not returning because this is a server-job and client shouldn't wait for it to complete

        gameDoc.ref.collection(`players`).get().then(allPlayersQuerySnapshot => {
          if (!allPlayersQuerySnapshot.docs.length) {
            return gameDoc.ref.delete();
          }
        });
      } else {
        // TODO: Track/log this error somehow
        return Promise.reject(quitGameErrors.PLAYER_DOES_NOT_EXIST);
      }
    } else {
      // TODO: Track/log this error somehow
      return Promise.reject(quitGameErrors.GAME_DOES_NOT_EXIST);
    }
  });

  return function quitGame(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

exports.quitGame = quitGame;
const createGameErrors = {
  CANNOT_CREATE_GAME: {
    code: `CANNOT_CREATE_GAME`,
    message: `Shit. We're having trouble creating a game at the moment.`
  }
};
exports.createGameErrors = createGameErrors;

let createGame =
/*#__PURE__*/
(() => {
  var _ref3 = _asyncToGenerator(function* (userId) {
    try {
      const gameCode = Math.floor(Math.random() * 900000) + 100000;
      const newGame = {
        gameCode,
        host: userId,
        state: `OPEN`
      };
      yield admin.firestore().collection(`games`).add(newGame);
      const gameId = yield joinGame(userId, gameCode);
      return {
        gameCode,
        gameId
      };
    } catch (e) {
      // TODO: Track/log this error somehow
      return Promise.reject(createGameErrors.CANNOT_CREATE_GAME);
    }
  });

  return function createGame(_x5) {
    return _ref3.apply(this, arguments);
  };
})();

exports.createGame = createGame;
const startGameErrors = {
  CANNOT_START_GAME: {
    code: `CANNOT_START_GAME`,
    message: `Shit. We're having trouble starting the game at the moment.`
  }
};
exports.startGameErrors = startGameErrors;

let startGame =
/*#__PURE__*/
(() => {
  var _ref4 = _asyncToGenerator(function* (gameId) {
    yield admin.firestore().collection(`games`).doc(gameId).update({
      state: `STARTED`
    });
  });

  return function startGame(_x6) {
    return _ref4.apply(this, arguments);
  };
})();

exports.startGame = startGame;