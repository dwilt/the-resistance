import { put, takeEvery, select, call } from 'redux-saga/effects';

import { isSpySelector } from 'selectors';
import { gameIdSelector, passesMissionSelector, userIdSelector } from "../../selectors";
import { fireFetch } from "../../services";

export const setCastVoteAction = (castVote) => ({
    type: `SET_CONDUCT_MISSION_CAST_VOTE`,
    payload: {
        castVote,
    },
});

export const passMissionAction = () => setCastVoteAction(true);

export const failMissionAction = () => ({
    type: `FAIL_MISSION_VOTE`,
});

export const submitMissionPass = () => ({
    type: `SUBMIT_MISSION_PASSES`,
});

export const setMissionPassesAction = (userId, passes) => ({
    type: `SET_MISSION_PASSES`,
    payload: {
        userId,
        passes,
    },
});

function* failMissionVote() {
    const isSpy = yield select(isSpySelector);

    if (isSpy) {
        yield put(setCastVoteAction(false));
    }
}

function* submitMissionPasses() {
    const gameId = yield select(gameIdSelector);
    const userId = yield select(userIdSelector);
    const passes = yield select(passesMissionSelector);

    yield put(setMissionPassesAction(userId, passes));

    yield call(fireFetch, `submitMissionPasses`, {
        gameId,
        userId,
        passes,
    });
}

export default function*() {
    yield takeEvery(failMissionAction().type, failMissionVote);
    yield takeEvery(submitMissionPass().type, submitMissionPasses);
}
