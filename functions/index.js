"use strict";

var _games = require("./games");

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const functions = require("firebase-functions");

function sendSuccessfulResponse(res, payload = {
  success: true
}) {
  res.type(`json`).send(payload);
}

function handleError(error = {}, errors = {}, res) {
  console.log(`error`, error);
  console.log(`errors`, errors);
  const knownError = errors[error.code];
  const status = knownError || 500;
  const resError = knownError ? error : {
    code: `STANDARD_ERROR`,
    message: `Fuck. There was some kind of unexpected error and we're not sure why. But we're on it!`
  };
  res.type(`json`).status(status).send(resError);
}

exports.createGame = functions.https.onRequest(
/*#__PURE__*/
(() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    const {
      userId
    } = req.query;

    try {
      const {
        gameCode,
        gameId
      } = yield (0, _games.createGame)(userId);
      sendSuccessfulResponse(res, {
        gameId,
        gameCode
      });
    } catch (error) {
      handleError(error, {
        [_games.createGameErrors.CANNOT_CREATE_GAME.code]: 500
      }, res);
    }
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
      sendSuccessfulResponse(res, {
        gameId
      });
    } catch (error) {
      handleError(error, {
        [_games.joinGameErrors.GAME_DOES_NOT_EXIST.code]: 404
      }, res);
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
      sendSuccessfulResponse(res);
    } catch (error) {
      handleError(error, {
        [_games.quitGameErrors.GAME_DOES_NOT_EXIST.code]: 404,
        [_games.quitGameErrors.PLAYER_DOES_NOT_EXIST.code]: 404
      }, res);
    }
  });

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})());