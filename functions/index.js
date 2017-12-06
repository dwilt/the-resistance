function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const functions = require("firebase-functions");

const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
exports.createGame = functions.https.onRequest(
/*#__PURE__*/
(() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    const {
      userId
    } = req.query;
    const gameCode = Math.floor(Math.random() * 900000) + 100000;
    const newGame = {
      gameCode,
      host: userId,
      state: `OPEN`
    };
    yield admin.firestore().collection(`games`).add(newGame);
    res.type("json").send({
      gameCode
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
    const {
      docs
    } = yield admin.firestore().collection(`games`).where(`gameCode`, `==`, parseInt(gameCode)).where(`state`, `==`, `OPEN`).get();

    if (docs.length) {
      const game = docs[0];
      const gameId = game.id;
      yield game.ref.collection(`players`).add({
        userId
      });
      res.type(`json`).send({
        gameId
      });
    } else {
      res.type(`json`).status(404).send({
        message: `No open game exists with that code`
      });
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
    const gameDoc = yield admin.firestore().collection(`games`).doc(gameId).get();

    if (gameDoc.exists) {
      const querySnapshot = yield gameDoc.ref.collection(`players`).where(`userId`, `==`, userId).get();

      if (querySnapshot.docs.length) {
        const player = querySnapshot.docs[0];
        yield player.ref.delete();
        res.send({
          success: true
        });
      } else {
        res.type(`json`).status(404).send({
          message: `This player doesn't exist in this game`
        });
      }
    } else {
      res.type(`json`).status(404).send({
        message: `This game doesn't exist`
      });
    }
  });

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})());