const functions = require(`firebase-functions`);

import {
    quitGame,
    createGame,
    joinGame,
    startGame,
    confirmSelectedMissionTeam,
    submitProposedMissionTeamApproval,
    retractProposedMissionTeamApproval,
    submitMissionPasses,
    revealProposedMissionTeamVote,
    startNextRound,
    buildNewMissionTeam,
    confirmPlayerIdentity,
    updateProposedMissionTeam,
    conductMission,
} from "./games";

function functionCreator(method) {
    return async function(req, res) {
        try {
            const payload = await method(req.body);

            res.type(`json`).send(
                payload || {
                    success: true,
                }
            );
        } catch (error) {
            console.log(`error`, error);

            const resError =
                error.code && error.message
                    ? error
                    : {
                        code: `STANDARD_ERROR`,
                        message: `Fuck. There was some kind of unexpected error and we're on it!`,
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

exports.updateProposedMissionTeam = functions.https.onRequest(
    functionCreator(updateProposedMissionTeam)
);

exports.confirmSelectedMissionTeam = functions.https.onRequest(
    functionCreator(confirmSelectedMissionTeam)
);

exports.submitProposedMissionTeamApproval = functions.https.onRequest(
    functionCreator(submitProposedMissionTeamApproval)
);

exports.retractProposedMissionTeamApproval = functions.https.onRequest(
    functionCreator(retractProposedMissionTeamApproval)
);

exports.submitMissionPasses = functions.https.onRequest(
    functionCreator(submitMissionPasses)
);

exports.revealProposedMissionTeamVote = functions.https.onRequest(
    functionCreator(revealProposedMissionTeamVote)
);

exports.startNextRound = functions.https.onRequest(
    functionCreator(startNextRound)
);

exports.buildNewMissionTeam = functions.https.onRequest(
    functionCreator(buildNewMissionTeam)
);

exports.confirmPlayerIdentity = functions.https.onRequest(
    functionCreator(confirmPlayerIdentity)
);

exports.conductMission = functions.https.onRequest(
    functionCreator(conductMission)
);
