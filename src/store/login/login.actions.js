import {
    put,
    select,
    takeEvery,
} from 'redux-saga/effects';

import {
    Keyboard,
} from 'react-native';

import {
    getLoginAction,
    getUserLoggingInAction,
    getUserLoggedInAction,
    getUserLoginError,
    getRegisterAction,
    getUserRegisteringAction,
    getUserRegisteredAction,
} from 'store/user/user.actions';

import {
   loginEmailSelector,
   loginPasswordSelector,
    loginNameSelector,
    loginShowingRegisterFormSelector,
} from 'selectors';

import { Home } from "components";

import { Actions } from "react-native-router-flux";

export const setPasswordAction = (password) => ({
    type: `SET_LOGIN_PASSWORD`,
    payload: {
        password,
    },
});

export const setEmailAction = (email) => ({
    type: `SET_LOGIN_EMAIL`,
    payload: {
        email,
    },
});

export const setNameAction = (name) => ({
    type: `SET_LOGIN_NAME`,
    payload: {
        name,
    },
});

export const setShowRegisterAction = (showRegister) => ({
    type: `SET_LOGIN_SHOW_REGISTER`,
    payload: {
        showRegister,
    },
});

export const setIsRegisteringAction = (isRegistering) => ({
    type: `SET_LOGIN_IS_REGISTERING`,
    payload: {
        isRegistering,
    },
});

export const setIsLoggingInAction = (isLoggingIn) => ({
    type: `SET_LOGIN_IS_LOGGING_IN`,
    payload: {
        isLoggingIn,
    },
});

export const setErrorAction = (error) => ({
    type: `SET_LOGIN_ERROR`,
    payload: {
        error,
    },
});

export const getRegisterOnPressAction = () => ({
    type: `LOGIN_REGISTER_BUTTON_ON_PRESS`,
});

export const getLoginOnPressAction = () => ({
    type: `LOGIN_SUBMIT_BUTTON_ON_PRESS`,
});

export const getToggleLoginRegisterAction = () => ({
    type: `LOGIN_TOGGLE_FORM`,
});

function* registerOnPress() {
    const email = yield select(loginEmailSelector);
    const password = yield select(loginPasswordSelector);
    const name = yield select(loginNameSelector);

    yield put(getRegisterAction({
        email,
        password,
        name,
    }));
}

function* loginOnPress() {
    const email = yield select(loginEmailSelector);
    const password = yield select(loginPasswordSelector);

    yield put(getLoginAction(email, password));
}

function* loggingIn() {
    yield put(setErrorAction(null));
    yield put(setIsLoggingInAction(true));

    Keyboard.dismiss();
}

function* registered() {
    yield put(setIsRegisteringAction(false));
    yield put(setEmailAction(``));
    yield put(setPasswordAction(``));
    yield put(setNameAction(``));
}

function* registering() {
    yield put(setErrorAction(null));
    yield put(setIsRegisteringAction(true));

    Keyboard.dismiss();
}

function* loggedIn() {
    yield put(setIsLoggingInAction(false));
    yield put(setEmailAction(``));
    yield put(setPasswordAction(``));

    Actions[Home.key]();
}

function* loginError({ payload: { error } }) {
    yield put(setIsLoggingInAction(false));
    yield put(setErrorAction(error));
}

function* toggleForm() {
    const showingRegister = yield select(loginShowingRegisterFormSelector);

    if (showingRegister) {
        yield put(setShowRegisterAction(false));
    } else {
        yield put(setShowRegisterAction(true));
    }
}

export default function* () {
    // yield takeEvery(setEmailAction().type, validateEmail);
    //
    // yield takeEvery([
    //     setEmailAction().type,
    //     setPasswordAction().type,
    // ], validateForm);

    yield takeEvery(getLoginOnPressAction().type, loginOnPress);
    // yield takeEvery(getForgotPasswordOnPressAction().type, forgotPasswordOnPress);
    yield takeEvery(getRegisterOnPressAction().type, registerOnPress);
    yield takeEvery(getUserRegisteringAction().type, registering);
    yield takeEvery(getUserRegisteredAction().type, registered);
    yield takeEvery(getUserLoggingInAction().type, loggingIn);
    yield takeEvery(getUserLoggedInAction().type, loggedIn);
    yield takeEvery(getUserLoginError().type, loginError);
    yield takeEvery(getToggleLoginRegisterAction().type, toggleForm);
}
