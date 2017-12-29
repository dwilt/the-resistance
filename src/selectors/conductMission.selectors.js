import {
    createSelector,
} from 'reselect';

const conductMissionSelector = state => state.conductMission;

export const conductMissionCastVoteSelector = createSelector(
    conductMissionSelector,
    conductMission => conductMission.castVote
);

