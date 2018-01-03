import { createSelector } from 'reselect';

import { didMissionFail } from 'src/gameStructure';

import { userIdSelector } from 'selectors';

import { getMissionMembersCount } from '../gameStructure';

const gameSelector = (state) => state.game;

const gameDataSelector = (state) => state.game.data;

export const gameIdSelector = createSelector(gameSelector, (game) => game.id);

export const currentMissionSelector = createSelector(
    gameDataSelector,
    (gameData) => gameData.currentMission || {},
);

export const proposedMissionTeamSelector = createSelector(
    currentMissionSelector,
    (currentMission) => currentMission.proposedTeam || [],
);

export const missionTeamSelector = createSelector(
    currentMissionSelector,
    (currentMission) => currentMission.missionTeam || {},
);

export const missionTeamVotesSelector = createSelector(
    currentMissionSelector,
    (currentMission) => currentMission.missionTeamVotes || {},
);

export const gameStateSelector = createSelector(
    gameDataSelector,
    (game) => game.state,
);

export const victoryTypeSelector = createSelector(
    gameDataSelector,
    (game) => game.victoryType,
);

export const gameCodeSelector = createSelector(
    gameDataSelector,
    (game) => game.gameCode,
);

const hostSelector = createSelector(gameDataSelector, (game) => game.host);

export const isHostSelector = createSelector(
    [hostSelector, userIdSelector],
    (host, userId) => host === userId,
);

export const playersSelector = createSelector(
    gameSelector,
    (game) => game.players,
);

export const allPlayersConfirmedIdentitySelector = createSelector(
    [playersSelector],
    (players) =>
        !players.filter(({ confirmedIdentity }) => !confirmedIdentity).length,
);

export const playerConfirmedIdentitySelector = createSelector(
    [playersSelector, userIdSelector],
    (players, userId) => {
        const { confirmedIdentity } = players.find(({ id }) => id === userId);

        return !!confirmedIdentity;
    },
);

export const leaderSelector = createSelector(
    currentMissionSelector,
    (currentMission) => currentMission.leader,
);

export const leaderIdSelector = createSelector(
    [leaderSelector, playersSelector],
    (leaderId, players) => players.find(({ id }) => id === leaderId).id,
);

export const leaderNameSelector = createSelector(
    [leaderSelector, playersSelector],
    (leaderId, players) => players.find(({ id }) => id === leaderId).name,
);

export const isLeaderSelector = createSelector(
    [leaderIdSelector, userIdSelector],
    (leaderId, userId) => leaderId === userId,
);

export const isSpySelector = createSelector(
    [userIdSelector, playersSelector],
    (userId, players) => players.find(({ id }) => id === userId).isSpy,
);

export const spiesSelector = createSelector([playersSelector], (players) =>
    players.filter(({ isSpy }) => isSpy),
);

const completedMissionsSelector = createSelector(
    gameSelector,
    (game) => game.completedMissions,
);

export const roundCountSelector = createSelector(
    completedMissionsSelector,
    (completedMissions) => completedMissions.length + 1,
);

export const failedMissionsSelector = createSelector(
    [completedMissionsSelector, playersSelector],
    (completedMissions, players) =>
        completedMissions.filter(({ missionTeam }, i) => {
            const totalPlayers = players.length;
            const roundCount = i + 1;
            const failedVotes = Object.values(missionTeam).filter(
                (passed) => !passed,
            ).length;

            return didMissionFail({ totalPlayers, failedVotes, roundCount });
        }).length,
);

export const passedMissionsSelector = createSelector(
    [completedMissionsSelector, failedMissionsSelector],
    (completedMissions, failedMissions) =>
        completedMissions.length - failedMissions,
);

export const proposedMissionTeamIsFilledSelector = createSelector(
    [roundCountSelector, playersSelector, proposedMissionTeamSelector],
    (roundCount, players = [], proposedTeam = []) =>
        getMissionMembersCount(roundCount, players.length) ===
        proposedTeam.length,
);

export const proposedMissionTeamNamesSelector = createSelector(
    [proposedMissionTeamSelector, playersSelector],
    (proposedTeam, players) =>
        players.filter(({ id }) => proposedTeam.indexOf(id) !== -1),
);

export const missionTeamVotingCompleteSelector = createSelector(
    [missionTeamVotesSelector, playersSelector],
    (missionTeamVotes, players) => {
        return Object.keys(missionTeamVotes).length === players.length;
    },
);

export const missionTeamVotesRejectedSelector = createSelector(
    [missionTeamVotesSelector],
    (missionTeamVotes) => {
        return Object.values(missionTeamVotes).filter((approved) => !approved)
            .length;
    },
);

export const missionTeamVotesApprovedSelector = createSelector(
    [missionTeamVotesSelector],
    (missionTeamVotes) => {
        return Object.values(missionTeamVotes).filter((approved) => approved)
            .length;
    },
);

export const missionTeamApprovedSelector = createSelector(
    [missionTeamVotesApprovedSelector, playersSelector],
    (approvedVotes, players) => {
        const totalPlayers = players.length;

        const majority =
            totalPlayers % 2 === 0
                ? totalPlayers / 2 + 1
                : Math.ceil(totalPlayers / 2);

        return approvedVotes >= majority;
    },
);

export const missionTeamSubmittedVoteSelector = createSelector(
    [missionTeamVotesSelector, userIdSelector],
    (missionTeamVotes, userId) =>
        typeof missionTeamVotes[userId] !== `undefined`,
);

export const isOnMissionTeamSelector = createSelector(
    [missionTeamSelector, userIdSelector],
    (missionTeam, userId) => Object.keys(missionTeam).indexOf(userId) !== -1,
);

export const submittedMissionPassVoteSelector = createSelector(
    [missionTeamSelector, userIdSelector],
    (missionTeam, userId) => missionTeam[userId] !== null,
);

export const missionPassedVotesSelector = createSelector(
    [missionTeamSelector],
    (missionTeam) =>
        Object.values(missionTeam).filter((passed) => passed).length,
);

export const missionFailedVotesSelector = createSelector(
    [missionTeamSelector],
    (missionTeam) =>
        Object.values(missionTeam).filter((passed) => !passed).length,
);

export const missionPassedSelector = createSelector(
    [playersSelector, roundCountSelector, missionFailedVotesSelector],
    (players, roundCount, failedVotes) => {
        return !didMissionFail({
            roundCount,
            totalPlayers: players.length,
            failedVotes,
        });
    },
);

export const enoughPlayersInGameSelector = createSelector(
    [playersSelector],
    (players) => players.length > 4,
);

export const missionTeamPlayersSelector = createSelector(
    [missionTeamSelector, playersSelector],
    (missionTeam, players) =>
        players.filter(({ id }) => Object.keys(missionTeam).indexOf(id) !== -1),
);
