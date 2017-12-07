const functions = require("firebase-functions");

import {
    quitGame,
    quitGameErrors,
    createGame,
    joinGame,
    joinGameErrors
} from "./games";

exports.createGame = functions.https.onRequest(async (req, res) => {
    const { userId } = req.query;

    const { gameCode, gameId } = await createGame(userId);

    res.type("json").send({
        gameCode,
        gameId
    });
});

exports.joinGame = functions.https.onRequest(async (req, res) => {
    const { gameCode, userId } = req.query;

    try {
        const gameId = await joinGame(userId, parseInt(gameCode));

        res.type(`json`).send({
            gameId
        });
    } catch ({ code, message }) {
        switch (code) {
            case joinGameErrors.GAME_DOES_NOT_EXIST:
                res
                    .type(`json`)
                    .status(404)
                    .send({
                        message
                    });
        }
    }
});

exports.quitGame = functions.https.onRequest(async (req, res) => {
    const { gameId, userId } = req.query;

    try {
        await quitGame(userId, gameId);

        res.type(`json`).send({
            success: true
        });
    } catch ({ code, message }) {
        switch (code) {
            case quitGameErrors.PLAYER_DOES_NOT_EXIST:
            case quitGameErrors.GAME_DOES_NOT_EXIST:
                res
                    .type(`json`)
                    .status(404)
                    .send({
                        message
                    });
        }
    }
});
