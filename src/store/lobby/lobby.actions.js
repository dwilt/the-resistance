import { startingGameAction, startedGameAction } from 'store/game/game.actions';

import { put, takeEvery } from 'redux-saga/effects';

export const setIsStartingGameAction = (isStartingGame) => ({
    type: `SET_LOBBY_IS_STARTING_GAME`,
    payload: {
        isStartingGame,
    },
});

function* starting() {
    yield put(setIsStartingGameAction(true));
}

function* started() {
    yield put(setIsStartingGameAction(false));
}

export default function*() {
    yield takeEvery(startingGameAction().type, starting);
    yield takeEvery(startedGameAction().type, started);
}
