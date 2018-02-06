import { call, put, select, takeEvery } from "redux-saga/effects";

import { gameIdSelector } from "selectors";

import { fireFetch } from "services";

export const setIsStartingNextRoundAction = isStartingNextRound => ({
    type: `SET_MISSION_OUTCOME_IS_STARTING_NEXT_ROUND`,
    payload: {
        isStartingNextRound,
    },
});

export const startNextRoundAction = () => ({
    type: `START_NEXT_ROUND`,
});

function* startNextRound() {
    const gameId = yield select(gameIdSelector);

    yield put(setIsStartingNextRoundAction(true));

    yield call(fireFetch, `startNextRound`, {
        gameId,
    });

    yield put(setIsStartingNextRoundAction(false));
}

export default function*() {
    yield takeEvery(startNextRoundAction().type, startNextRound);
}
