import {
    gameStates,
    getMissionMembersCount,
    getSpyCount,
    singleMissionFailedMissionTeamsLimit,
    totalRounds
} from "./gameStructure";

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
} from "./helpers/firestore";

async function setNewLeader({ gameId }) {
    const [game, players] = await Promise.all([
        getGame(gameId),
        getPlayers(gameId)
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

    await updateGame(gameId, {
        previousLeaders: newPreviousLeaders,
        [`currentMission.leader`]: leader
    });
}

export async function startNewRound({ gameId }) {
    return Promise.all([
        updateGame(gameId, {
            state: gameStates.BUILD_MISSION_TEAM,
            currentMission: null
        }),
        setNewLeader(gameId)
    ]);
}

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
            gameId
        };
    } else {
        return Promise.reject({
            code: `GAME_DOES_NOT_EXIST`,
            message: `No open game exists with that code`
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
        state: gameStates.LOBBY
    });

    const { gameId } = await joinGame({ userId, gameCode });

    return {
        gameCode,
        gameId
    };
}

export async function startGame({ gameId }) {
    const players = await getPlayers(gameId);
    const totalSpies = getSpyCount(players.length);
    const spies = sampleSize(players, totalSpies);

    return Promise.all([
        ...players.map(player =>
            updatePlayer(gameId, player.id, {
                isSpy: spies.indexOf(player) !== -1
            })
        ),
        updateGame(gameId, {
            state: gameStates.PLAYER_REVEAL
        })
    ]);
}

async function adjustMissionTeam({ gameId, userId, add = true }) {
    const [game, players = [], completedMissions = []] = await Promise.all([
        getGame(gameId),
        getPlayers(gameId),
        getCompletedMissions(gameId)
    ]);

    const { currentMission = {} } = game;
    const { missionTeam = {} } = currentMission;
    const { members = [] } = missionTeam;

    const updatedMissionTeam = add
        ? [...members, userId]
        : members.filter(missionMemberId => missionMemberId !== userId);

    const totalPlayers = players.length;
    const currentRound = completedMissions.length + 1;

    const filled =
        updatedMissionTeam.length ===
        getMissionMembersCount(currentRound, totalPlayers);

    await updateGame(gameId, {
        [`currentMission.missionTeam.members`]: updatedMissionTeam,
        [`currentMission.missionTeam.filled`]: filled
    });
}

export async function removePlayerFromMissionTeam({ gameId, userId }) {
    return adjustMissionTeam({ gameId, userId, add: false });
}

export async function addPlayerToMissionTeam({ gameId, userId }) {
    return adjustMissionTeam({ gameId, userId });
}

export async function confirmMissionTeam({ gameId }) {
    const game = await getGame(gameId);
    const { currentMission = {} } = game;
    const { missionTeam = {} } = currentMission;
    const { members = [] } = missionTeam;

    return updateGame(gameId, {
        state: gameStates.MISSION_TEAM_VOTE,
        [`currentMission.missionTeam`]: members.reduce(
            (currentMissionTeam, userId) => {
                currentMissionTeam[userId] = null;

                return currentMissionTeam;
            },
            {}
        )
    });
}

export async function revealMissionTeamVote({ gameId }) {
    const [players, game] = await Promise.all([
        getPlayers(gameId),
        getGame(gameId)
    ]);

    const {
        currentMission: {
            missionTeamVotes,
            leader,
            missionTeam,
            failedTeams = []
        }
    } = game;

    const totalPlayers = players.length;

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

    const approved = approvedVotes >= majority;

    const updatedGame = {
        state: gameStates.MISSION_TEAM_VOTE_REVEAL,
        [`currentMission.missionTeamVotes.approved`]: approved
    };

    if (!approved) {
        const failedTeam = {
            leader,
            missionTeam,
            missionTeamVotes
        };

        updatedGame[`currentMission.failedTeams`] = [
            ...failedTeams,
            failedTeam
        ];
    }

    if (
        !approved &&
        failedTeams.length >= singleMissionFailedMissionTeamsLimit - 1
    ) {
        updatedGame.state = gameStates.COMPLETED;
    }

    await updateGame(gameId, updatedGame);
}

export async function voteForMissionTeam({ gameId, userId, approves }) {
    await updateGame(gameId, {
        [`currentMission.missionTeamVotes.votes.${userId}`]: approves
    });
}

export async function confirmPlayerIdentity({ gameId, userId }) {
    await updatePlayer(gameId, userId, {
        confirmedIdentity: true
    });

    const players = await getPlayers(gameId);
    const unconfirmedPlayers = players.filter(
        ({ confirmedIdentity }) => confirmedIdentity
    );

    if (unconfirmedPlayers.length) {
        return !!unconfirmedPlayers.length;
    } else {
        return Promise.all([
            updateGame(gameId, {
                state: gameStates.BUILD_MISSION_TEAM
            }),
            setNewLeader(gameId)
        ]);
    }
}

export async function voteForMission({ gameId, userId, succeeds }) {
    const game = await updateGame(gameId, {
        [`currentMission.missionTeam.${userId}`]: succeeds
    });

    const { currentMission = {} } = game;
    const { missionTeam = {} } = currentMission;

    const nonVoters = Object.keys(missionTeam).filter(
        userId => missionTeam[userId] === null
    );

    if (!nonVoters.length) {
        const [completedMissions, players] = await Promise.all([
            getCompletedMissions(gameId),
            getPlayers(gameId)
        ]);

        const totalPlayers = players.length;
        const roundNumber = completedMissions.length;
        const failedVotes = Object.keys(missionTeam).filter(
            userId => !missionTeam[userId]
        );

        const failed =
            roundNumber === 4 && totalPlayers > 7
                ? failedVotes.length > 1
                : !!failedVotes.length;

        const majority = Math.floor(totalRounds / 2);

        const failedMissions = completedMissions.filter(
            ({ passed }) => !passed
        );
        const passedMissions = completedMissions.filter(({ passed }) => passed);

        let state = gameStates.MISSION_OUTCOME_REVEAL;

        if (
            (failed && failedMissions.length + 1 > majority) ||
            (!failed && passedMissions.length + 1 > majority)
        ) {
            state = gameStates.COMPLETED;
        }

        currentMission.passed = !failed;

        await addCompletedMission(gameId, currentMission);

        await updateGame(gameId, {
            state,
            [`currentMission.passed`]: !failed
        });
    }
}
