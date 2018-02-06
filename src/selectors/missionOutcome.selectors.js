import { createSelector } from 'reselect';

const missionOutcomeSelector = (state) => state.missionOutcome;

export const missionOutcomeIsStartingNextRoundSelector = createSelector(
    missionOutcomeSelector,
    (missionOutcome) => missionOutcome.isStartingNextRound,
);
