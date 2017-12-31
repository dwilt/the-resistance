import { put, takeEvery, select } from 'redux-saga/effects';

import { isSpySelector } from 'selectors';

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

function* failMissionVote() {
    const isSpy = yield select(isSpySelector);

    if (isSpy) {
        yield put(setCastVoteAction(false));
    }
}

export default function*() {
    yield takeEvery(failMissionAction().type, failMissionVote);
}
