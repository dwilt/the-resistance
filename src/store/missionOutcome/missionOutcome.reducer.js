import { setIsStartingNextRoundAction } from "./missionOutcome.actions";

import { createReducer } from "helpers";

export default createReducer(
    {
        isStartingNextRound: false,
    },
    {
        [setIsStartingNextRoundAction().type]: (
            state,
            { isStartingNextRound }
        ) => ({
            ...state,
            isStartingNextRound,
        }),
    }
);
