import { setCastVoteAction } from './conductMission.actions';

import { createReducer } from 'helpers';

export default createReducer(
    {
        castVote: null,
        showAllyWarning: false,
    },
    {
        [setCastVoteAction().type]: (state, { castVote }) => ({
            ...state,
            castVote,
        }),
    },
);
