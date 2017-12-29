import {
    setCastVoteAction,
} from './conductMission.actions';

import {
    createReducer,
} from 'helpers';

export default createReducer({
    castVote: null,
},{
    [setCastVoteAction().type]: (state, { castVote }) => ({
        ...state,
        castVote,
    }),
});