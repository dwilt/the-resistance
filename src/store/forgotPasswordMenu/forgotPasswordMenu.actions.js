import { put, select, takeEvery } from 'redux-saga/effects';
import { forgotPasswordMenuIsOpenSelector } from 'selectors';
import { Actions } from 'react-native-router-flux';

export const setIsOpenAction = (isOpen) => ({
    type: `SET_FORGOT_PASSWORD_MENU_IS_OPEN`,
    payload: {
        isOpen,
    },
});

export const setIsSubmittingAction = (isSubmitting) => ({
    type: `SET_FORGOT_PASSWORD_MENU_IS_SUBMITTING`,
    payload: {
        isSubmitting,
    },
});

export const getToggleForgotPasswordMenuAction = () => ({
    type: `TOGGLE_MENU`,
});

function* toggleMenu() {
    const isOpen = yield select(forgotPasswordMenuIsOpenSelector);

    if (isOpen) {
        yield put(setIsOpenAction(false));
        Actions.pop();
    } else {
        yield put(setIsOpenAction(true));
        Actions.ForgotPasswordMenu();
    }
}

export default function*() {
    yield takeEvery(getToggleForgotPasswordMenuAction().type, toggleMenu);
}
