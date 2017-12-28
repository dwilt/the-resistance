import { createSelector } from 'reselect';

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

export const gameStateSelector = createSelector(
    gameDataSelector,
    (game) => game.state,
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
    gameDataSelector,
    (gameData) => gameData.allPlayersConfirmedIdentity,
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

export const passedMissionsSelector = createSelector(
    completedMissionsSelector,
    (completedMissions) => completedMissions.filter((mi) => mi.passed).length,
);

export const failedMissionsSelector = createSelector(
    completedMissionsSelector,
    (completedMissions) => completedMissions.filter((mi) => !mi.passed).length,
);

export const propedMissionTeamIsFilledSelector = createSelector(
    [roundCountSelector, playersSelector, proposedMissionTeamSelector],
    (roundCount, players = [], proposedTeam = []) =>
        getMissionMembersCount(roundCount, players.length) ===
        proposedTeam.length,
);
