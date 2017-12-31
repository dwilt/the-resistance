import {
    startingNextRoundAction,
    startedNextRoundAction,
} from 'store/game/game.actions';

import { put, takeEvery } from 'redux-saga/effects';

export const setIsStartingNextRoundAction = (isStartingNextRound) => ({
    type: `SET_MISSION_OUTCOME_IS_STARTING_NEXT_ROUND`,
    payload: {
        isStartingNextRound,
    },
});

function* starting() {
    yield put(setIsStartingNextRoundAction(true));
}

function* started() {
    yield put(setIsStartingNextRoundAction(false));
}

export default function*() {
    yield takeEvery(startingNextRoundAction().type, starting);
    yield takeEvery(startedNextRoundAction().type, started);
}
