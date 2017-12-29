import { takeEvery, put } from 'redux-saga/effects';

import {
    joiningGameAction,
    joinedGameAction,
    creatingNewGameAction,
    createdNewGameAction,
} from 'store/game/game.actions';

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

export const showJoinOverlayAction = () => setShowJoinOverlayAction(true);

export const hideJoinOverlayAction = () => setShowJoinOverlayAction(false);

function* joiningGame() {
    yield put(setIsJoiningGameAction(true));
}

function* joinedGame() {
    yield put(setIsJoiningGameAction(true));
}

function* creatingGame() {
    yield put(setIsCreatingGameAction(true));
}

function* createdGame() {
    yield put(setIsCreatingGameAction(true));
}

export default function*() {
    yield takeEvery(joiningGameAction().type, joiningGame);
    yield takeEvery(joinedGameAction().type, joinedGame);
    yield takeEvery(creatingNewGameAction().type, creatingGame);
    yield takeEvery(createdNewGameAction().type, createdGame);
}
