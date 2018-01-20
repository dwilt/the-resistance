import { createSelector } from 'reselect';

const missionTeamVoteOutcomeSelector = (state) =>
    state.missionTeamVoteOutcome;

export const missionTeamVoteOutcomeIsConductingSelector = createSelector(
    missionTeamVoteOutcomeSelector,
    (missionTeamVoteOutcome) => missionTeamVoteOutcome.isConducting,
);

export const missionTeamVoteOutcomeIsSelectingNewLeaderSelector = createSelector(
    missionTeamVoteOutcomeSelector,
    (missionTeamVoteOutcome) => missionTeamVoteOutcome.isSelectingNewLeader,
);
