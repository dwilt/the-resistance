import { gameStates, getSpyCount, totalRounds } from "./gameStructure";

import { sampleSize, difference } from "lodash";

import {
    addCompletedMission,
    addGame,
    addPlayer,
    deleteGame,
    deletePlayer,
    getCompletedMissions,
    getGame,
    getOpenGameByCode,
    getPlayer,
    getPlayers,
    getUser,
    updateGame,
    updatePlayer
} from "./helpers";

async function startNewRound(gameId) {
    return Promise.all([
        updateGame(gameId, {
            state: gameStates.LEADER_ASSEMBLE_TEAM,
            missionTeam: null,
            missionTeamVotes: null
        }),
        setNewLeader(gameId)
    ]);
}

async function setNewLeader(gameId) {
    const [game, playersDocs] = await Promise.all([
        getGame(gameId),
        getPlayers(gameId)
    ]);

    const players = playersDocs.map(doc => doc.id);
    const { previousLeaders = [] } = game;
    const refreshLeaders = previousLeaders.length === players.length;
    const potentialLeaders = refreshLeaders
        ? players
        : difference(players, previousLeaders);
    const leader = sampleSize(potentialLeaders, 1)[0];
    const newPreviousLeaders = refreshLeaders
        ? [leader]
        : [...previousLeaders, leader];

    await updateGame(gameId, {
        previousLeaders: newPreviousLeaders,
        [`currentMission.leader`]: leader
    });
}

export const joinGameErrors = {
    GAME_DOES_NOT_EXIST: {
        code: `GAME_DOES_NOT_EXIST`,
        message: `No open game exists with that code`
    }
};

export async function joinGame(userId, gameCode) {
    const game = await getOpenGameByCode(gameCode);

    if (game) {
        const gameId = game.id;
        const player = await getPlayer(gameId, userId);

        if (!player.exists) {
            const userDoc = await getUser(userId);
            const { name } = userDoc.data();

            await addPlayer(gameId, userId, name);
        }

        return gameId;
    } else {
        return Promise.reject(joinGameErrors.GAME_DOES_NOT_EXIST);
    }
}

export async function quitGame(gameId, playerId) {
    await deletePlayer(gameId, playerId);

    const players = await getPlayers(gameId);

    if (!players.length) {
        deleteGame(gameId);
    }
}

export async function createGame(userId) {
    // TODO: come up with better, safer code generation lol
    const gameCode = Math.floor(Math.random() * 900000) + 100000;

    await addGame({
        gameCode,
        host: userId,
        state: gameStates.LOBBY
    });

    const gameId = await joinGame(userId, gameCode);

    return {
        gameCode,
        gameId
    };
}

export async function startGame(gameId) {
    const playersDocs = await getPlayers(gameId);
    const totalSpies = getSpyCount(playersDocs.length);
    const spies = sampleSize(playersDocs, totalSpies);

    return Promise.all([
        ...playersDocs.map(doc =>
            updatePlayer(gameId, doc.id, {
                isSpy: spies.indexOf(doc) !== -1
            })
        ),
        startNewRound(gameId)
    ]);
}

export async function setMissionTeam(gameId, missionTeamIds = []) {
    const missionTeam = missionTeamIds.reduce((team, id) => {
        team[id] = null;

        return team;
    }, {});

    await updateGame(gameId, {
        state: gameStates.MISSION_TEAM_VOTE,
        [`currentMission.missionTeam`]: missionTeam
    });
}

export async function voteForMissionTeam({ gameId, userId, approves }) {
    await updateGame(gameId, {
        [`currentMission.missionTeamVotes.${userId}`]: approves
    });

    const [playersDocs, game] = await Promise.all([
        getPlayers(gameId),
        getGame(gameId)
    ]);

    const totalPlayers = playersDocs.length;
    const {
        currentMission: {
            missionTeamVotes,
            leader,
            missionTeam,
            failedTeams = []
        }
    } = game;
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
        await updateGame(gameId, {
            state: gameStates.CONDUCT_MISSION
        });
    } else if (rejectedVotes >= majority || isTied) {
        if (failedTeams.length >= 4) {
            await updateGame(gameId, {
                state: gameStates.COMPLETED
            });
        } else {
            const failedTeam = {
                leader,
                missionTeam,
                missionTeamVotes
            };

            await Promise.all([
                updateGame(gameId, {
                    state: gameStates.LEADER_ASSEMBLE_TEAM,
                    [`currentMission.missionTeamVotes`]: null,
                    [`currentMission.failedTeams`]: [...failedTeams, failedTeam]
                }),
                setNewLeader(gameId)
            ]);
        }
    }
}

export async function voteForMission({ gameId, userId, succeeds }) {
    await updateGame(gameId, {
        [`currentMission.missionTeam.${userId}`]: succeeds
    });

    const { currentMission } = await getGame(gameId);
    const { missionTeam } = currentMission;

    const nonVoters = Object.keys(missionTeam).filter(
        userId => missionTeam[userId] === null
    );

    if (!nonVoters.length) {
        const [completedMissionsDocs, playersDocs] = await Promise.all([
            getCompletedMissions(gameId),
            getPlayers(gameId)
        ]);

        const roundNumber = completedMissionsDocs.length;
        const totalPlayers = playersDocs.length;
        const failedVotes = Object.keys(missionTeam).filter(
            userId => missionTeam[userId] === false
        );

        const missionFailed =
            roundNumber === 4 && totalPlayers > 7
                ? failedVotes.length > 1
                : !!failedVotes.length;

        // TODO: convert to spread when you figure out wtf is going on
        await addCompletedMission(
            gameId,
            Object.assign(
                {},
                {
                    missionFailed
                },
                currentMission
            )
        );

        if (roundNumber === totalRounds) {
            await updateGame(gameId, {
                state: gameStates.COMPLETED
            });
        } else {
            await startNewRound(gameId);
        }
    }
}
