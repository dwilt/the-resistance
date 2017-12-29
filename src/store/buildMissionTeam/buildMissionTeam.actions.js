import {
    confirmingMissionTeamAction,
    confirmedMissionTeamAction,
} from 'store/game/game.actions';

import { put, takeEvery } from "redux-saga/effects";

export const setIsConfirmingAction = (isConfirming) => ({
    type: `SET_BUILD_MISSION_TEAM_IS_CONFIRMING`,
    payload: {
        isConfirming
    },
});

function* confirming() {
    yield put(setIsConfirmingAction(true));
}

function* confirmed() {
    yield put(setIsConfirmingAction(false));
}

export default function*() {
    yield takeEvery(confirmingMissionTeamAction().type, confirming);
    yield takeEvery(confirmedMissionTeamAction().type, confirmed);
}
