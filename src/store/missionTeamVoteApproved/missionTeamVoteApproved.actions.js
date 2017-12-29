import {
   conductingMissionAction,
   conductedMissionAction,
} from 'store/game/game.actions';

import { put, takeEvery } from "redux-saga/effects";

export const setIsConductingAction = (isConducting) => ({
    type: `SET_MISSION_TEAM_VOTE_APPROVED_IS_CONDUCTING`,
    payload: {
        isConducting
    },
});

function* conducting() {
    yield put(setIsConductingAction(true));
}

function* conducted() {
    yield put(setIsConductingAction(false));
}

export default function*() {
    yield takeEvery(conductingMissionAction().type, conducting);
    yield takeEvery(conductedMissionAction().type, conducted);
}
