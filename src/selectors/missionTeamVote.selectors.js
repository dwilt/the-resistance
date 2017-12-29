import { createSelector } from 'reselect';

const missionTeamVoteSelector = (state) => state.missionTeamVote;

export const missionTeamCastVoteSelector = createSelector(
    missionTeamVoteSelector,
    (missionTeamVote) => missionTeamVote.castVote,
);

export const missionTeamVoteCastSelector = createSelector(
    missionTeamCastVoteSelector,
    (castVote) => typeof castVote !== `undefined`,
);

export const approvesProposedMissionTeamSelector = createSelector(
    [missionTeamCastVoteSelector],
    (castVote) => castVote === true,
);

export const rejectsProposedMissionTeamSelector = createSelector(
    [missionTeamCastVoteSelector],
    (castVote) => castVote === false,
);
