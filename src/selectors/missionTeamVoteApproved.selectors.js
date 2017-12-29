import {
    createSelector,
} from 'reselect';

const missionTeamVoteApprovedSelector = state => state.missionTeamVoteApproved;

export const missionTeamVoteApprovedIsConductingSelector = createSelector(
    missionTeamVoteApprovedSelector,
    missionTeamVoteApproved => missionTeamVoteApproved.isConducting
);

