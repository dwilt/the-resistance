import {
    confirmingMissionTeamAction,
    confirmedMissionTeamAction,
    confirmPlayerIdentityAction,
} from 'store/game/game.actions';

import { put, takeEvery } from 'redux-saga/effects';

export const setConfirmedIdentityAction = (confirmedIdentity) => ({
    type: `SET_BUILD_MISSION_TEAM_CONFIRMED_IDENTITY`,
    payload: {
        confirmedIdentity,
    },
});

export const setIsConfirmingAction = (isConfirming) => ({
    type: `SET_BUILD_MISSION_TEAM_IS_CONFIRMING`,
    payload: {
        isConfirming,
    },
});

function* confirmIdentity() {
    yield put(setConfirmedIdentityAction(true));
}

function* confirming() {
    yield put(setIsConfirmingAction(true));
}

function* confirmed() {
    yield put(setIsConfirmingAction(false));
}

export default function*() {
    yield takeEvery(confirmingMissionTeamAction().type, confirming);
    yield takeEvery(confirmedMissionTeamAction().type, confirmed);
    yield takeEvery(confirmPlayerIdentityAction().type, confirmIdentity);
}
