import {
    gameStates,
    getMissionMembersCount,
    getSpyCount,
    singleMissionFailedMissionTeamsLimit,
    totalRounds,
    victoryTypes,
} from './gameStructure';

import { sampleSize, difference } from 'lodash';

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
    updatePlayer,
} from './helpers/firestore';

export async function joinGame({ userId, gameCode }) {
    const game = await getOpenGameByCode(parseInt(gameCode));

    if (game) {
        const gameId = game.id;
        const player = await getPlayer(gameId, userId);

        if (!player.exists) {
            const userDoc = await getUser(userId);
            const { name } = userDoc.data();

            await addPlayer(gameId, userId, name);
        }

        return {
            gameId,
        };
    } else {
        return Promise.reject({
            code: `GAME_DOES_NOT_EXIST`,
            message: `No open game exists with that code`,
        });
    }
}

export async function quitGame({ gameId, playerId }) {
    await deletePlayer(gameId, playerId);

    const players = await getPlayers(gameId);

    if (!players.length) {
        deleteGame(gameId);
    }
}

export async function createGame({ userId }) {
    // TODO: come up with better, safer code generation lol
    const gameCode = Math.floor(Math.random() * 900000) + 100000;

    await addGame({
        gameCode,
        host: userId,
        state: gameStates.LOBBY,
    });

    const { gameId } = await joinGame({ userId, gameCode });

    return {
        gameCode,
        gameId,
    };
}

export async function startGame({ gameId }) {
    const players = await getPlayers(gameId);
    const totalSpies = getSpyCount(players.length);
    const spies = sampleSize(players, totalSpies);

    await Promise.all([
        ...players.map((player) =>
            updatePlayer(gameId, player.id, {
                isSpy: spies.indexOf(player) !== -1,
            }),
        ),
    ]);

    return updateGame(gameId, {
        state: gameStates.PLAYER_IDENTITY_REVEAL,
    });
}

export async function buildNewMissionTeam({ gameId }) {
    const [game, players] = await Promise.all([
        getGame(gameId),
        getPlayers(gameId),
    ]);

    const playersIds = players.map(({ id }) => id);
    const { previousLeaders = [] } = game;
    const refreshLeaders = previousLeaders.length === playersIds.length;
    const potentialLeaders = refreshLeaders
        ? playersIds
        : difference(playersIds, previousLeaders);
    const leader = sampleSize(potentialLeaders, 1)[0];
    const newPreviousLeaders = refreshLeaders
        ? [leader]
        : [...previousLeaders, leader];

    return updateGame(gameId, {
        state: gameStates.BUILD_MISSION_TEAM,
        previousLeaders: newPreviousLeaders,
        currentMission: {
            leader,
        },
    });
}

export async function confirmPlayerIdentity({ gameId, userId }) {
    await updatePlayer(gameId, userId, {
        confirmedIdentity: true,
    });

    const players = await getPlayers(gameId);
    const unconfirmedPlayers = players.filter(
        ({ confirmedIdentity }) => !confirmedIdentity,
    );

    if (!unconfirmedPlayers.length) {
        await buildNewMissionTeam({ gameId });
    }
}

// building mission team
async function adjustProposedMissionTeam({ gameId, userId, add = true }) {
    const [game, players = [], completedMissions = []] = await Promise.all([
        getGame(gameId),
        getPlayers(gameId),
        getCompletedMissions(gameId),
    ]);

    const { currentMission = {} } = game;
    const { proposedTeam = {} } = currentMission;
    const { members = [] } = proposedTeam;

    const updatedProposedMissionTeam = add
        ? [...members, userId]
        : members.filter((missionMemberId) => missionMemberId !== userId);

    const totalPlayers = players.length;
    const currentRound = completedMissions.length + 1;

    const filled =
        updatedProposedMissionTeam.length ===
        getMissionMembersCount(currentRound, totalPlayers);

    await updateGame(gameId, {
        [`currentMission.proposedTeam.members`]: updatedProposedMissionTeam,
        [`currentMission.proposedTeam.filled`]: filled,
    });
}

export async function removePlayerFromMissionTeam({ gameId, userId }) {
    return adjustProposedMissionTeam({ gameId, userId, add: false });
}

export async function addPlayerToMissionTeam({ gameId, userId }) {
    return adjustProposedMissionTeam({ gameId, userId });
}

export async function confirmSelectedMissionTeam({ gameId }) {
    return updateGame(gameId, {
        state: gameStates.MISSION_TEAM_VOTE,
    });
}

// Vote for mission team
export async function submitProposedMissionTeamApproval({
    gameId,
    userId,
    approves,
}) {
    const [players, game] = await Promise.all([
        getPlayers(gameId),
        getGame(gameId),
    ]);

    const { currentMission } = game;

    currentMission.missionTeamVotes = currentMission.missionTeamVotes || {};
    currentMission.missionTeamVotes.votes =
        currentMission.missionTeamVotes.votes || {};

    currentMission.missionTeamVotes.votes[userId] = approves;
    currentMission.missionTeamVotes.votingComplete =
        Object.keys(currentMission.missionTeamVotes).length === players.length;

    await updateGame(gameId, {
        [`currentMission.missionTeamVotes`]: currentMission.missionTeamVotes,
    });
}

export async function revealProposedMissionTeamVote({ gameId }) {
    const [players, game] = await Promise.all([
        getPlayers(gameId),
        getGame(gameId),
    ]);

    const {
        currentMission: {
            missionTeamVotes,
            leader,
            proposedTeam,
            failedTeams = [],
        },
    } = game;

    const totalPlayers = players.length;

    const majority =
        totalPlayers % 2 === 0
            ? totalPlayers / 2 + 1
            : Math.ceil(totalPlayers / 2);

    let approvedVotes = 0;
    let rejectedVotes = 0;

    Object.keys(missionTeamVotes).forEach((userId) => {
        const approved = missionTeamVotes[userId];

        if (approved) {
            approvedVotes += 1;
        } else {
            rejectedVotes += 1;
        }
    });

    const approved = approvedVotes >= majority;

    const updatedGame = {
        state: gameStates.MISSION_TEAM_VOTE_OUTCOME,
        [`currentMission.missionTeamVotes.approved`]: approved,
    };

    if (!approved) {
        const failedTeam = {
            leader,
            proposedTeam,
            missionTeamVotes,
        };

        updatedGame[`currentMission.failedTeams`] = [
            ...failedTeams,
            failedTeam,
        ];

        if (failedTeams.length >= singleMissionFailedMissionTeamsLimit - 1) {
            updatedGame.state = gameStates.COMPLETED;
            updatedGame.victoryType = victoryTypes.SPIES_PREVENTED_MISSION_TEAM;
        }
    }

    await updateGame(gameId, updatedGame);
}

export async function conductMission({ gameId }) {
    const [game] = await Promise.all([getGame(gameId)]);

    const { currentMission: { proposedTeam: { members } } } = game;
    const missionTeam = members.reduce((current, member) => {
        current[member] = null;

        return current;
    }, {});

    await updateGame(gameId, {
        state: gameStates.CONDUCT_MISSION,
        [`currentMission.missionTeam`]: missionTeam,
    });
}

export async function submitMissionSuccess({ gameId, userId, succeeds }) {
    const game = await updateGame(gameId, {
        [`currentMission.missionTeam.${userId}`]: succeeds,
    });

    const { currentMission = {} } = game;
    const { missionTeam = {} } = currentMission;

    const nonVoters = Object.keys(missionTeam).filter(
        (userId) => missionTeam[userId] === null,
    );

    if (!nonVoters.length) {
        const [completedMissions, players] = await Promise.all([
            getCompletedMissions(gameId),
            getPlayers(gameId),
        ]);

        const totalPlayers = players.length;
        const roundNumber = completedMissions.length;
        const failedVotes = Object.keys(missionTeam).filter(
            (userId) => !missionTeam[userId],
        );

        const failed =
            roundNumber === 4 && totalPlayers > 7
                ? failedVotes.length > 1
                : !!failedVotes.length;

        currentMission.passed = !failed;

        await addCompletedMission(gameId, currentMission);

        const majority = Math.floor(totalRounds / 2);

        const failedMissions = completedMissions.filter(
            ({ passed }) => !passed,
        );
        const passedMissions = completedMissions.filter(({ passed }) => passed);

        const spiesWon = failed && failedMissions.length + 1 > majority;
        const alliesWon = !failed && passedMissions.length + 1 > majority;

        if (spiesWon || alliesWon) {
            const victoryType = alliesWon
                ? victoryTypes.ALLIES_COMPLETED_MISSIONS
                : victoryTypes.SPIES_COMPLETED_MISSIONS;

            await updateGame(gameId, {
                state: gameStates.COMPLETED,
                victoryType,
            });
        } else {
            await updateGame(gameId, {
                state: gameStates.MISSION_OUTCOME,
                [`currentMission.passed`]: !failed,
            });
        }
    }
}

export async function startNextRound({ gameId }) {
    await buildNewMissionTeam({ gameId });
}
