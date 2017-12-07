const functions = require("firebase-functions");

import {
    quitGame,
    quitGameErrors,
    createGame,
    createGameErrors,
    joinGame,
    joinGameErrors
} from "./games";

function handleError(error = {}, errors = {}, res) {
    const knownError = errors[error.code];
    const status = knownError || 500;
    const resError = knownError || {
        code: `STANDARD_ERROR`,
        message: `Fuck. There was some kind of unexpected error and we're not sure why. But we're on it!`
    };

    res
        .type(`json`)
        .status(status)
        .send(resError);
}

exports.createGame = functions.https.onRequest(async (req, res) => {
    const { userId } = req.query;

    try {
        const { gameCode, gameId } = await createGame(userId);

        res.type("json").send({
            gameCode,
            gameId
        });
    } catch (error) {
        handleError(
            error,
            {
                [createGameErrors.CANNOT_CREATE_GAME.code]: 500
            },
            res
        );
    }
});

exports.joinGame = functions.https.onRequest(async (req, res) => {
    const { gameCode, userId } = req.query;

    try {
        const gameId = await joinGame(userId, parseInt(gameCode));

        res.type(`json`).send({
            gameId
        });
    } catch (error) {
        handleError(
            error,
            {
                [joinGameErrors.GAME_DOES_NOT_EXIST.code]: 404
            },
            res
        );
    }
});

exports.quitGame = functions.https.onRequest(async (req, res) => {
    const { gameId, userId } = req.query;

    try {
        await quitGame(userId, gameId);

        res.type(`json`).send({
            success: true
        });
    } catch (error) {
        handleError(
            error,
            {
                [quitGameErrors.GAME_DOES_NOT_EXIST.code]: 404,
                [quitGameErrors.PLAYER_DOES_NOT_EXIST.code]: 404
            },
            res
        );
    }
});
