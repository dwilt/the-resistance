import { setCastVoteAction } from './missionTeamVote.actions';

import { createReducer } from 'helpers';

export default createReducer(
    {},
    {
        [setCastVoteAction().type]: (state, { castVote }) => ({
            ...state,
            castVote,
        }),
    },
);
