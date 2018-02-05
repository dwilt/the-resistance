import { call, put, select, takeEvery } from 'redux-saga/effects';

import { gameIdSelector, userIdSelector, proposedMissionTeamSelector } from "selectors";

import { fireFetch } from "services";

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

export const confirmMissionTeamAction = () => ({
    type: `CONFIRM_MISSION_TEAM`,
});

export const confirmPlayerIdentityAction = () => ({
    type: `CONFIRM_PLAYER_IDENTITY_ACTION`,
});

export const setConfirmedPlayerIdentityAction = (userId) => ({
    type: `SET_CONFIRM_PLAYER_IDENTITY`,
    payload: {
        userId,
    },
});

export const toggleMissionTeamMemberAction = (userId, selected) => ({
    type: `TOGGLE_MISSION_MEMBER`,
    payload: {
        userId,
        selected,
    },
});

function* updateProposedMissionTeam() {
    const gameId = yield select(gameIdSelector);
    const team = yield select(proposedMissionTeamSelector);

    yield call(fireFetch, `updateProposedMissionTeam`, {
        gameId,
        team,
    });
}

function* confirmMissionTeam() {
    const gameId = yield select(gameIdSelector);

    yield put(setIsConfirmingAction(true));

    yield call(fireFetch, `confirmSelectedMissionTeam`, {
        gameId,
    });

    yield put(setIsConfirmingAction(false));
}

function* confirmPlayerIdentity() {
    const gameId = yield select(gameIdSelector);
    const userId = yield select(userIdSelector);

    yield put(setConfirmedPlayerIdentityAction(userId));

    yield call(fireFetch, `confirmPlayerIdentity`, {
        gameId,
        userId,
    });
}

export default function*() {
    yield takeEvery(confirmMissionTeamAction().type, confirmMissionTeam);
    yield takeEvery(confirmPlayerIdentityAction().type, confirmPlayerIdentity);
    yield takeEvery(toggleMissionTeamMemberAction().type, updateProposedMissionTeam);
}
