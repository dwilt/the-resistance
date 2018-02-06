import { call, put, select, takeEvery } from "redux-saga/effects";

import { gameIdSelector } from "selectors";

import { fireFetch } from "services";

export const setIsStartingGameAction = isStartingGame => ({
    type: `SET_LOBBY_IS_STARTING_GAME`,
    payload: {
        isStartingGame,
    },
});

export const startGameAction = () => ({
    type: `START_GAME`,
});

function* startGame() {
    const gameId = yield select(gameIdSelector);

    yield put(setIsStartingGameAction(true));

    yield call(fireFetch, `startGame`, {
        gameId,
    });

    yield put(setIsStartingGameAction(false));
}

export default function*() {
    yield takeEvery(startGameAction().type, startGame);
}
