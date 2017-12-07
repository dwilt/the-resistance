"use strict";

var _games = require("./games");

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const functions = require("firebase-functions");

exports.createGame = functions.https.onRequest(
/*#__PURE__*/
(() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    const {
      userId
    } = req.query;
    const {
      gameCode,
      gameId
    } = yield (0, _games.createGame)(userId);
    res.type("json").send({
      gameCode,
      gameId
    });
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());
exports.joinGame = functions.https.onRequest(
/*#__PURE__*/
(() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    const {
      gameCode,
      userId
    } = req.query;

    try {
      const gameId = yield (0, _games.joinGame)(userId, parseInt(gameCode));
      res.type(`json`).send({
        gameId
      });
    } catch ({
      code,
      message
    }) {
      switch (code) {
        case _games.joinGameErrors.GAME_DOES_NOT_EXIST:
          res.type(`json`).status(404).send({
            message
          });
      }
    }
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})());
exports.quitGame = functions.https.onRequest(
/*#__PURE__*/
(() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    const {
      gameId,
      userId
    } = req.query;

    try {
      yield (0, _games.quitGame)(userId, gameId);
      res.type(`json`).send({
        success: true
      });
    } catch ({
      code,
      message
    }) {
      switch (code) {
        case _games.quitGameErrors.PLAYER_DOES_NOT_EXIST:
        case _games.quitGameErrors.GAME_DOES_NOT_EXIST:
          res.type(`json`).status(404).send({
            message
          });
      }
    }
  });

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})());