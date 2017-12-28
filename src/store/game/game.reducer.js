import {
    setGameIdAction,
    setGameDataAction,
    setGamePlayersAction,
} from 'store/game/game.actions';

import { createReducer } from 'helpers';

export default createReducer(
    {
        id: null,
        players: [],
        completedMissions: [],
        data: null,
    },
    {
        [setGameIdAction().type]: (state, { id }) => ({
            ...state,
            id,
        }),
        [setGameDataAction().type]: (state, { data }) => ({
            ...state,
            data,
        }),
        [setGamePlayersAction().type]: (state, { players }) => ({
            ...state,
            players,
        }),
    },
);
