import { setIsStartingGameAction } from './lobby.actions';

import { createReducer } from 'helpers';

export default createReducer(
    {
        isStartingGame: false,
    },
    {
        [setIsStartingGameAction().type]: (state, { isStartingGame }) => ({
            ...state,
            isStartingGame,
        }),
    },
);
