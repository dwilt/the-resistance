import { takeEvery, put, select, call, all, take } from 'redux-saga/effects';

import { joinGameInputSelector, userIdSelector } from 'selectors';

import { db, fireFetch } from 'services';

import { join } from 'store/game/game.actions';

export const setHomeErrorAction = (error) => ({
    type: `SET_HOME_ERROR`,
    payload: {
        error,
    },
});

export const setIsCreatingGameAction = (isCreatingGame) => ({
    type: `SET_HOME_IS_CREATING_GAME`,
    payload: {
        isCreatingGame,
    },
});

export const setIsJoiningGameAction = (isJoiningGame) => ({
    type: `SET_HOME_IS_JOINING_GAME`,
    payload: {
        isJoiningGame,
    },
});

export const setShowJoinOverlayAction = (showJoinGameOverlay) => ({
    type: `SET_SHOW_JOIN_OVERLAY`,
    payload: {
        showJoinGameOverlay,
    },
});

export const setJoinGameInputAction = (joinGameInput) => ({
    type: `SET_HOME_JOIN_GAME_INPUT`,
    payload: {
        joinGameInput,
    },
});

export const createNewGameAction = () => ({
    type: `CREATE_NEW_GAME`,
});

export const joinGameAction = () => ({
    type: `JOIN_GAME`,
});

export const showJoinOverlayAction = () => setShowJoinOverlayAction(true);

export const hideJoinOverlayAction = () => setShowJoinOverlayAction(false);

function* joinGame() {
    const userId = yield select(userIdSelector);
    const gameCode = yield select(joinGameInputSelector);

    yield put(setIsJoiningGameAction(true));

    const { id, data, players, completedMissions } = yield call(
        fireFetch,
        `joinGame`,
        {
            gameCode,
            userId,
        },
    );

    yield* join({ id, data, players, completedMissions });

    yield put(setIsJoiningGameAction(false));
}

function* createNewGame() {
    const userId = yield select(userIdSelector);

    yield put(setIsCreatingGameAction(true));

    const { id, data, players, completedMissions } = yield call(
        fireFetch,
        `createGame`,
        {
            userId,
        },
    );

    yield* join({ id, data, players, completedMissions });

    yield put(setIsCreatingGameAction(true));
}

export default function*() {
    yield takeEvery(joinGameAction().type, joinGame);
    yield takeEvery(createNewGameAction().type, createNewGame);
}
