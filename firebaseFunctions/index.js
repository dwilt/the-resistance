const functions = require("firebase-functions");

import {
    quitGame,
    quitGameErrors,
    createGame,
    createGameErrors,
    joinGame,
    joinGameErrors,
    startGame,
    startGameErrors
} from "./games";

function sendSuccessfulResponse(
    res,
    payload = {
        success: true
    }
) {
    res.type(`json`).send(payload);
}

function handleError(error = {}, errors = {}, res) {
    console.log(`error`, error);
    console.log(`errors`, errors);

    const knownError = errors[error.code];
    const statusCode = knownError || 500;
    const resError = knownError
        ? error
        : {
              code: `STANDARD_ERROR`,
              message: `Fuck. There was some kind of unexpected error and we're not sure why. But we're on it!`
          };

    res
        .type(`json`)
        .status(statusCode)
        .send(resError);
}

exports.createGame = functions.https.onRequest(async (req, res) => {
    try {
        const { userId } = req.query;
        const { gameCode, gameId } = await createGame(userId);

        sendSuccessfulResponse(res, {
            gameId,
            gameCode
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
    try {
        const { gameCode, userId } = req.query;
        const gameId = await joinGame(userId, parseInt(gameCode));

        sendSuccessfulResponse(res, {
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
    try {
        const { gameId, userId } = req.query;

        await quitGame(userId, gameId);

        sendSuccessfulResponse(res);
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

exports.startGame = functions.https.onRequest(async (req, res) => {
    try {
        const { gameId } = req.query;

        await startGame(gameId);

        sendSuccessfulResponse(res);
    } catch (error) {
        handleError(
            error,
            {
                [startGameErrors.CANNOT_START_GAME.code]: 500
            },
            res
        );
    }
});
