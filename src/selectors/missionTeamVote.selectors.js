import {
    createSelector,
} from 'reselect';

const missionTeamVoteSelector = state => state.missionTeamVote;

export const missionTeamCastVoteSelector = createSelector(
    missionTeamVoteSelector,
    missionTeamVote => missionTeamVote.castVote
);

export const missionTeamVoteIsRevealingSelector = createSelector(
    missionTeamVoteSelector,
    missionTeamVote => missionTeamVote.isRevealing
);

export const missionTeamVoteCastSelector = createSelector(
    missionTeamCastVoteSelector,
    (castVote) => castVote !== null,
);

export const approvesProposedMissionTeamSelector = createSelector(
    [missionTeamCastVoteSelector],
    (castVote) => castVote === true,
);

export const rejectsProposedMissionTeamSelector = createSelector(
    [missionTeamCastVoteSelector],
    (castVote) => castVote === false,
);

