import { put, select, takeEvery, call } from 'redux-saga/effects';

import {
    gameMenuIsOpenSelector,
    userIdSelector,
    gameIdSelector,
} from 'selectors';

import { Actions } from 'react-native-router-flux';

import { fireFetch } from 'services';

export const setIsOpenAction = (isOpen) => ({
    type: `SET_GAME_MENU_IS_OPEN`,
    payload: {
        isOpen,
    },
});

export const getToggleGameMenuAction = () => ({
    type: `TOGGLE_GAME_MENU`,
});

export const getQuitGameAction = () => ({
    type: `QUIT_GAME`,
});

function* toggleMenu() {
    const isOpen = yield select(gameMenuIsOpenSelector);

    if (isOpen) {
        yield put(setIsOpenAction(false));
        Actions.pop();
    } else {
        yield put(setIsOpenAction(true));
        Actions.GameMenu();
    }
}

function* quitGame() {
    const userId = yield select(userIdSelector);
    const gameId = yield select(gameIdSelector);

    Actions.Home();

    yield call(fireFetch, `quitGame`, {
        userId,
        gameId,
    });
}

export default function*() {
    yield takeEvery(getToggleGameMenuAction().type, toggleMenu);
    yield takeEvery(getQuitGameAction().type, quitGame);
}
