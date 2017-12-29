import {
    setIsRevealingAction,
    setCastVoteAction,
} from './missionTeamVote.actions';

import {
    createReducer,
} from 'helpers';

export default createReducer({
    isRevealing: false,
    castVote: null,
},{
    [setCastVoteAction().type]: (state, { castVote }) => ({
        ...state,
        castVote,
    }),
    [setIsRevealingAction().type]: (state, { isRevealing }) => ({
        ...state,
        isRevealing,
    }),
});