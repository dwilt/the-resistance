import { takeEvery, select, put } from 'redux-saga/effects';

import { Actions } from 'react-native-router-flux';

import { menuIsOpenSelector } from 'selectors';

export const setIsOpenAction = (isOpen) => ({
    type: `SET_MENU_IS_OPEN`,
    payload: {
        isOpen,
    },
});

export const getToggleMenuAction = () => ({
    type: `TOGGLE_MENU`,
});

function* toggleMenu() {
    const isOpen = yield select(menuIsOpenSelector);

    if (isOpen) {
        yield put(setIsOpenAction(false));
        Actions.pop();
    } else {
        yield put(setIsOpenAction(true));
        Actions.Menu();
    }
}

export default function*() {
    yield takeEvery(getToggleMenuAction().type, toggleMenu);
}
