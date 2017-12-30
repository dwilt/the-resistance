import { setIsConductingAction } from './missionTeamVoteApproved.actions';

import { createReducer } from 'helpers';

export default createReducer(
    {
        isConducting: false,
    },
    {
        [setIsConductingAction().type]: (state, { isConducting }) => ({
            ...state,
            isConducting,
        }),
    },
);
