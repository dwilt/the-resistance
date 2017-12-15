const functions = require("firebase-functions");

import {
    quitGame,
    createGame,
    joinGame,
    startGame,
    confirmMissionTeam,
    voteForMissionTeam,
    voteForMission,
    revealMissionTeamVote,
    startNewRound,
    confirmPlayerIdentity,
    removePlayerFromMissionTeam,
    addPlayerToMissionTeam
} from "./games";

function functionCreator(method) {
    return async function(req, res) {
        try {
            const payload = await method(req.body);

            res.type(`json`).send(
                payload || {
                    success: true
                }
            );
        } catch (error) {
            console.log(`error`, error);

            const resError =
                error.code && error.message
                    ? error
                    : {
                          code: `STANDARD_ERROR`,
                          message: `Fuck. There was some kind of unexpected error and we're on it!`
                      };

            res
                .type(`json`)
                .status(500)
                .send(resError);
        }
    };
}

exports.createGame = functions.https.onRequest(functionCreator(createGame));

exports.joinGame = functions.https.onRequest(functionCreator(joinGame));

exports.quitGame = functions.https.onRequest(functionCreator(quitGame));

exports.startGame = functions.https.onRequest(functionCreator(startGame));

exports.removePlayerFromMissionTeam = functions.https.onRequest(
    functionCreator(removePlayerFromMissionTeam)
);

exports.addPlayerToMissionTeam = functions.https.onRequest(
    functionCreator(addPlayerToMissionTeam)
);

exports.confirmMissionTeam = functions.https.onRequest(
    functionCreator(confirmMissionTeam)
);

exports.voteForMissionTeam = functions.https.onRequest(
    functionCreator(voteForMissionTeam)
);

exports.voteForMission = functions.https.onRequest(
    functionCreator(voteForMission)
);

exports.revealMissionTeamVote = functions.https.onRequest(
    functionCreator(revealMissionTeamVote)
);

exports.startNewRound = functions.https.onRequest(
    functionCreator(startNewRound)
);

exports.confirmPlayerIdentity = functions.https.onRequest(
    functionCreator(confirmPlayerIdentity)
);
