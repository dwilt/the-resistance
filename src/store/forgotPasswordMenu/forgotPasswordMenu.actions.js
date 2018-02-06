import { put, select, takeEvery, call } from 'redux-saga/effects';
import {
    forgotPasswordMenuIsOpenSelector,
    loginEmailSelector,
} from 'selectors';

import { Actions } from 'react-native-router-flux';

import { rsf, alert, runAfterInteractions } from 'services';

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

export const setErrorAction = (error) => ({
    type: `SET_FORGOT_PASSWORD_MENU_ERROR`,
    payload: {
        error,
    },
});

export const getToggleForgotPasswordMenuAction = () => ({
    type: `TOGGLE_FORGOT_PASSWORD_MENU`,
});

export const getSubmitForgotPasswordAction = () => ({
    type: `SUBMIT_FORGOT_PASSWORD`,
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

function* submit() {
    try {
        const email = yield select(loginEmailSelector);

        yield put(setIsSubmittingAction(true));

        yield call(rsf.auth.sendPasswordResetEmail, email);

        yield* toggleMenu();

        yield call(runAfterInteractions);

        yield call(
            alert,
            `Sent!`,
            `An email with instructions to reset your password has been sent to: ${email}`,
        );

        yield put(setIsSubmittingAction(false));
    } catch ({ message }) {
        yield put(setErrorAction(message));
    }
}

export default function*() {
    yield takeEvery(getToggleForgotPasswordMenuAction().type, toggleMenu);
    yield takeEvery(getSubmitForgotPasswordAction().type, submit);
}
