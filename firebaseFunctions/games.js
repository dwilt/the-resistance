import { spyCount, gameStates } from "./gameStructure";

import { sampleSize, difference } from "lodash";

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

async function setNewLeader(gameId) {
    const [gameDoc, playersSnapshot] = await Promise.all([
        admin
            .firestore()
            .collection(`games`)
            .doc(gameId)
            .get(),
        admin
            .firestore()
            .collection(`games`)
            .doc(gameId)
            .collection(`players`)
            .get()
    ]);

    const players = playersSnapshot.docs.map(doc => doc.data().id);
    const { previousLeaders = [] } = gameDoc.data();

    let leader = null;

    if (previousLeaders.length === players.length) {
        leader = sampleSize(players, 1)[0];

        await gameDoc.ref.update({
            previousLeaders: [leader]
        });
    } else {
        const remainingPotentialLeaders = difference(players, previousLeaders);

        leader = sampleSize(remainingPotentialLeaders, 1)[0];

        await gameDoc.ref.update({
            previousLeaders: [...previousLeaders, leader]
        });
    }

    gameDoc.ref.update({
        leader
    });
}

export const joinGameErrors = {
    GAME_DOES_NOT_EXIST: {
        code: `GAME_DOES_NOT_EXIST`,
        message: `No open game exists with that code`
    }
};

export async function joinGame(userId, gameCode) {
    const { docs: gameDocs } = await admin
        .firestore()
        .collection(`games`)
        .where(`gameCode`, `==`, parseInt(gameCode))
        .where(`state`, `==`, gameStates.LOBBY)
        .get();

    if (gameDocs.length) {
        const game = gameDocs[0];
        const gameId = game.id;

        const { docs: existingUserDoc } = await game.ref
            .collection(`players`)
            .where(`id`, `==`, userId)
            .get();

        // if the user isn't already in the game, add them
        if (!existingUserDoc.length) {
            const userDoc = await admin
                .firestore()
                .collection(`users`)
                .doc(userId)
                .get();

            const { name } = userDoc.data();

            await game.ref.collection(`players`).add({
                name,
                id: userId
            });
        }

        return gameId;
    } else {
        return Promise.reject(joinGameErrors.GAME_DOES_NOT_EXIST);
    }
}

export async function quitGame(userId, gameId) {
    const playerQuerySnapshot = await admin
        .firestore()
        .collection(`games`)
        .doc(gameId)
        .collection(`players`)
        .where(`id`, `==`, userId)
        .get();

    const player = playerQuerySnapshot.docs[0];

    await player.ref.delete();

    // check if player was last player in game - if so, delete game
    // not returning because this is a server-job and client shouldn't wait for it to complete
    if (playerQuerySnapshot.docs.length === 1) {
        admin
            .firestore()
            .collection(`games`)
            .doc(gameId)
            .delete();
    }
}

export async function createGame(userId) {
    const gameCode = Math.floor(Math.random() * 900000) + 100000;

    const newGame = {
        gameCode,
        host: userId,
        state: gameStates.LOBBY
    };

    await admin
        .firestore()
        .collection(`games`)
        .add(newGame);

    const gameId = await joinGame(userId, gameCode);

    return {
        gameCode,
        gameId
    };
}

export async function startGame(gameId) {
    const [playersSnapshot] = await Promise.all([
        admin
            .firestore()
            .collection(`games`)
            .doc(gameId)
            .collection(`players`)
            .get(),
        admin
            .firestore()
            .collection(`games`)
            .doc(gameId)
            .update({
                state: `PLAYER_REVEAL`
            })
    ]);

    const totalSpies = spyCount[playersSnapshot.docs.length];

    const spies = sampleSize(playersSnapshot.docs, totalSpies);

    return Promise.all([
        admin
            .firestore()
            .collection(`games`)
            .doc(gameId)
            .update({
                state: gameStates.PLAYER_REVEAL
            }),
        ...playersSnapshot.docs.map(
            doc =>
                doc.ref.update({
                    isSpy: spies.indexOf(doc) !== -1
                }),
            setNewLeader(gameId)
        )
    ]);
}

export async function setMissionTeam(gameId, missionTeamIds = []) {
    const missionTeam = {};

    missionTeamIds.forEach(id => (missionTeam[id] = null));

    await admin
        .firestore()
        .collection(`games`)
        .doc(gameId)
        .update({
            state: gameStates.MISSION_TEAM_VOTE,
            missionTeam
        });
}

export async function voteForMissionTeam({ gameId, userId, approves }) {
    await admin
        .firestore()
        .collection(`games`)
        .doc(gameId)
        .update({
            [`missionTeamVotes.${userId}`]: approves
        });

    const [playersSnapshot, gameDoc] = await Promise.all([
        admin
            .firestore()
            .collection(`games`)
            .doc(gameId)
            .collection(`players`)
            .get(),
        admin
            .firestore()
            .collection(`games`)
            .doc(gameId)
            .get()
    ]);

    const totalPlayers = playersSnapshot.docs.length;
    const { missionTeamVotes } = gameDoc.data();
    const majority =
        totalPlayers % 2 === 0
            ? totalPlayers / 2 + 1
            : Math.ceil(totalPlayers / 2);

    let approvedVotes = 0;
    let rejectedVotes = 0;

    Object.keys(missionTeamVotes).forEach(userId => {
        const approved = missionTeamVotes[userId];

        if (approved) {
            approvedVotes += 1;
        } else {
            rejectedVotes += 1;
        }
    });

    const isTied =
        approvedVotes + rejectedVotes === totalPlayers &&
        approvedVotes === rejectedVotes;

    if (approvedVotes >= majority) {
        await admin
            .firestore()
            .collection(`games`)
            .doc(gameId)
            .update({
                state: gameStates.CONDUCT_MISSION
            });
    } else if (rejectedVotes >= majority || isTied) {
        const gameDoc = await admin
            .firestore()
            .collection(`games`)
            .doc(gameId)
            .get();

        const { leader, missionTeam } = gameDoc.data();

        await gameDoc.ref.collection(`failedTeamAssembles`).add({
            leader,
            missionTeam,
            missionTeamVotes
        });

        const updatedGameDoc = await admin
            .firestore()
            .collection(`games`)
            .doc(gameId)
            .get();

        const { failedTeamAssembles = [] } = updatedGameDoc.data();

        if (failedTeamAssembles.length >= 5) {
            await admin
                .firestore()
                .collection(`games`)
                .doc(gameId)
                .update({
                    state: gameStates.COMPLETED
                });
        } else {
            await Promise.all([
                admin
                    .firestore()
                    .collection(`games`)
                    .doc(gameId)
                    .update({
                        state: gameStates.LEADER_ASSEMBLE_TEAM,
                        missionTeamVotes: {}
                    }),
                setNewLeader(gameId)
            ]);
        }
    }
}

export async function voteForMission({ gameId, userId, succeeds }) {
    await admin
        .firestore()
        .collection(`games`)
        .doc(gameId)
        .update({
            [`missionTeam.${userId}`]: succeeds
        });

    const gameDoc = await admin
        .firestore()
        .collection(`games`)
        .doc(gameId)
        .get();

    const { missionTeam } = gameDoc.data();
    const nonVoters = Object.keys(missionTeam).filter(
        userId => missionTeam[userId] === null
    );

    if (nonVoters.length) {
    }
}
