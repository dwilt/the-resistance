import { createReducer } from 'helpers';

export default createReducer(
    {
        joinGameInput: ``,
    },
    {
        [`SET_HOME_JOIN_GAME_INPUT`]: (state, { joinGameInput }) => ({
            ...state,
            joinGameInput,
        }),
    },
);
