import { createSelector } from 'reselect';

const conductMissionSelector = (state) => state.conductMission;

export const conductMissionCastVoteSelector = createSelector(
    conductMissionSelector,
    (conductMission) => conductMission.castVote,
);

export const conductMissionVoteCastSelector = createSelector(
    conductMissionCastVoteSelector,
    (castVote) => castVote !== null,
);

export const passesMissionSelector = createSelector(
    [conductMissionCastVoteSelector],
    (castVote) => castVote === true,
);

export const failsMissionSelector = createSelector(
    [conductMissionCastVoteSelector],
    (castVote) => castVote === false,
);
