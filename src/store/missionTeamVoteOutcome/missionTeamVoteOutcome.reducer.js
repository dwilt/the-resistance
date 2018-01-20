import { setIsConductingAction, setIsSelectingNewLeaderAction } from './missionTeamVoteOutcome.actions';

import { createReducer } from 'helpers';

export default createReducer(
    {
        isConducting: false,
        isSelectingNewLeader: false,
    },
    {
        [setIsConductingAction().type]: (state, { isConducting }) => ({
            ...state,
            isConducting,
        }),
        [setIsSelectingNewLeaderAction().type]: (state, { isSelectingNewLeader }) => ({
            ...state,
            isSelectingNewLeader,
        }),
    },
);
