import {
    createSelector,
} from 'reselect';

const buildMissionTeamSelector = state => state.buildMissionTeam;

export const buildMissionTeamIsConfirmingSelector = createSelector(
    buildMissionTeamSelector,
    buildMissionTeam => buildMissionTeam.isConfirming
);

