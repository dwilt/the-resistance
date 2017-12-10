"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addGame = addGame;
exports.updateGame = updateGame;
exports.getOpenGameByCode = exports.getUser = exports.getCompletedMissions = exports.addCompletedMission = exports.getPlayer = exports.deletePlayer = exports.updatePlayer = exports.addPlayer = exports.getPlayers = exports.deleteGame = exports.getGame = void 0;

var _gameStructure = require("./gameStructure");

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const functions = require("firebase-functions");

const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

function addGame(newGame) {
  return admin.firestore().collection(`games`).add(newGame);
}

let getGame =
/*#__PURE__*/
(() => {
  var _ref = _asyncToGenerator(function* (gameId) {
    const doc = yield admin.firestore().collection(`games`).doc(gameId).get();
    return doc.data();
  });

  return function getGame(_x) {
    return _ref.apply(this, arguments);
  };
})();

exports.getGame = getGame;

function updateGame(gameId, props) {
  return admin.firestore().collection(`games`).doc(gameId).update(props);
}

let deleteGame =
/*#__PURE__*/
(() => {
  var _ref2 = _asyncToGenerator(function* (gameId) {
    yield admin.firestore().collection(`games`).doc(gameId).delete();
  });

  return function deleteGame(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

exports.deleteGame = deleteGame;

let getPlayers =
/*#__PURE__*/
(() => {
  var _ref3 = _asyncToGenerator(function* (gameId) {
    const {
      docs
    } = yield admin.firestore().collection(`games`).doc(gameId).collection(`players`).get();
    return docs;
  });

  return function getPlayers(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

exports.getPlayers = getPlayers;

let addPlayer =
/*#__PURE__*/
(() => {
  var _ref4 = _asyncToGenerator(function* (gameId, userId, name) {
    const newPlayer = yield admin.firestore().collection(`games`).doc(gameId).collection(`players`).doc(userId);
    return newPlayer.set({
      name
    });
  });

  return function addPlayer(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
})();

exports.addPlayer = addPlayer;

let updatePlayer =
/*#__PURE__*/
(() => {
  var _ref5 = _asyncToGenerator(function* (gameId, userId, props = {}) {
    return admin.firestore().collection(`games`).doc(gameId).collection(`players`).doc(userId).update(props);
  });

  return function updatePlayer(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
})();

exports.updatePlayer = updatePlayer;

let deletePlayer =
/*#__PURE__*/
(() => {
  var _ref6 = _asyncToGenerator(function* (gameId, playerId) {
    return admin.firestore().collection(`games`).doc(gameId).collection(`players`).doc(playerId).delete();
  });

  return function deletePlayer(_x9, _x10) {
    return _ref6.apply(this, arguments);
  };
})();

exports.deletePlayer = deletePlayer;

let getPlayer =
/*#__PURE__*/
(() => {
  var _ref7 = _asyncToGenerator(function* (gameId, userId) {
    return admin.firestore().collection(`games`).doc(gameId).collection(`players`).doc(userId).get();
  });

  return function getPlayer(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
})();

exports.getPlayer = getPlayer;

let addCompletedMission =
/*#__PURE__*/
(() => {
  var _ref8 = _asyncToGenerator(function* (gameId, mission) {
    return admin.firestore().collection(`games`).doc(gameId).collection(`completedMissions`).add(mission);
  });

  return function addCompletedMission(_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
})();

exports.addCompletedMission = addCompletedMission;

let getCompletedMissions =
/*#__PURE__*/
(() => {
  var _ref9 = _asyncToGenerator(function* (gameId) {
    const {
      docs
    } = yield admin.firestore().collection(`games`).doc(gameId).collection(`completedMissions`).get();
    return docs;
  });

  return function getCompletedMissions(_x15) {
    return _ref9.apply(this, arguments);
  };
})();

exports.getCompletedMissions = getCompletedMissions;

let getUser =
/*#__PURE__*/
(() => {
  var _ref10 = _asyncToGenerator(function* (userId) {
    return admin.firestore().collection(`users`).doc(userId).get();
  });

  return function getUser(_x16) {
    return _ref10.apply(this, arguments);
  };
})();

exports.getUser = getUser;

let getOpenGameByCode =
/*#__PURE__*/
(() => {
  var _ref11 = _asyncToGenerator(function* (gameCode) {
    const {
      docs
    } = yield admin.firestore().collection(`games`).where(`gameCode`, `==`, gameCode).where(`state`, `==`, _gameStructure.gameStates.LOBBY).get();
    return docs[0];
  });

  return function getOpenGameByCode(_x17) {
    return _ref11.apply(this, arguments);
  };
})();

exports.getOpenGameByCode = getOpenGameByCode;