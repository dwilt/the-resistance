const functions = require("firebase-functions");

import {
    quitGame,
    createGame,
    joinGame,
    joinGameErrors,
    startGame,
    setMissionTeam,
    voteForMissionTeam,
    voteForMission
} from "./games";

function sendSuccessfulResponse(res, payload) {
    res.type(`json`).send(
        payload || {
            success: true
        }
    );
}

function handleError(res, error = {}, errors = {}) {
    console.log(`error`, error);

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
        const { userId } = req.body;
        const { gameCode, gameId } = await createGame(userId);

        sendSuccessfulResponse(res, {
            gameId,
            gameCode
        });
    } catch (error) {
        handleError(res, error);
    }
});

exports.joinGame = functions.https.onRequest(async (req, res) => {
    try {
        console.log(req);
        const { gameCode, userId } = req.body;
        const gameId = await joinGame(userId, parseInt(gameCode));

        sendSuccessfulResponse(res, {
            gameId
        });
    } catch (error) {
        handleError(res, error, {
            [joinGameErrors.GAME_DOES_NOT_EXIST.code]: 404
        });
    }
});

exports.quitGame = functions.https.onRequest(async (req, res) => {
    try {
        const { gameId, userId } = req.body;

        await quitGame(gameId, userId);

        sendSuccessfulResponse(res);
    } catch (error) {
        handleError(res, error);
    }
});

exports.startGame = functions.https.onRequest(async (req, res) => {
    try {
        const { gameId } = req.body;

        await startGame(gameId);

        sendSuccessfulResponse(res);
    } catch (error) {
        handleError(res, error);
    }
});

exports.setMissionTeam = functions.https.onRequest(async (req, res) => {
    try {
        const { gameId, missionTeam } = req.body;

        console.log(gameId, missionTeam);

        await setMissionTeam(gameId, missionTeam);

        sendSuccessfulResponse(res);
    } catch (error) {
        handleError(res, error);
    }
});

exports.voteForMissionTeam = functions.https.onRequest(async (req, res) => {
    try {
        const { gameId, userId, approves } = req.body;

        await voteForMissionTeam({ gameId, userId, approves });

        sendSuccessfulResponse(res);
    } catch (error) {
        handleError(res, error);
    }
});

exports.voteForMission = functions.https.onRequest(async (req, res) => {
    try {
        const { gameId, userId, succeeds } = req.body;

        await voteForMission({ gameId, userId, succeeds });

        sendSuccessfulResponse(res);
    } catch (error) {
        handleError(res, error);
    }
});
