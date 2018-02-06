import { rsf } from "services";

import firebase from "firebase";

import { buffers, eventChannel } from "redux-saga";

import { call, take, put, takeEvery } from "redux-saga/effects";

import { db } from "services";

import { Actions } from "react-native-router-flux";

import { Login } from "components";

export const setUserAction = user => ({
    type: `SET_USER`,
    payload: {
        user,
    },
});

export const getLoginAction = (email, password) => ({
    type: `LOGIN`,
    payload: {
        email,
        password,
    },
});

export const getRegisterAction = ({ email, password, name } = {}) => ({
    type: `REGISTER`,
    payload: {
        email,
        password,
        name,
    },
});

export const getLogOutAction = () => ({
    type: `LOGOUT`,
});

export const getUserLoggedOutAction = () => ({
    type: `USER_LOGGED_OUT`,
});

export const getUserLoggingInAction = () => ({
    type: `USER_LOGGING_IN`,
});

export const getUserLoggedInAction = () => ({
    type: `USER_LOGGED_IN`,
});

export const getUserRegisteringAction = () => ({
    type: `USER_REGISTERING`,
});

export const getUserRegisteredAction = () => ({
    type: `USER_REGISTERED`,
});

export const getUserLoginError = error => ({
    type: `USER_LOGIN_ERROR`,
    payload: {
        error,
    },
});

export const setIsLoggedInAction = isLoggedIn => ({
    type: `SET_USER_IS_LOGGED_IN`,
    payload: {
        isLoggedIn,
    },
});

function* logout() {
    yield call(rsf.auth.signOut);

    Actions[Login.key]();
}

function* login({ payload: { email, password } }) {
    try {
        yield put(getUserLoggingInAction());

        yield call(rsf.auth.signInWithEmailAndPassword, email, password);
    } catch ({ message }) {
        yield put(getUserLoginError(message));
    }
}

function* register({ payload: { email, password, name } }) {
    try {
        yield put(getUserRegisteringAction());

        yield call(rsf.auth.createUserWithEmailAndPassword, email, password);

        const userId = firebase.auth().currentUser.uid;

        yield call(rsf.firestore.setDocument, `users/${userId}`, {
            name,
        });

        yield put(getUserRegisteredAction());
    } catch ({ message }) {
        yield put(getUserLoginError(message));
    }
}

export default function*() {
    const channel = yield call(rsf.auth.channel);

    yield takeEvery(getLoginAction().type, login);
    yield takeEvery(getLogOutAction().type, logout);
    yield takeEvery(getRegisterAction().type, register);

    while (true) {
        const { user } = yield take(channel);

        yield put(setUserAction(user));

        if (user) {
            yield put(getUserLoggedInAction());
            yield put(setIsLoggedInAction(true));
        } else {
            yield put(getUserLoggedOutAction());
            yield put(setIsLoggedInAction(false));
        }
    }
}
