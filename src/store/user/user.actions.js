import { firebase } from 'services';

import { buffers, eventChannel } from 'redux-saga';

import { call, take, put, takeEvery } from 'redux-saga/effects';

import { db } from "../../services";

function createAuthStateChangedChannel() {
    return eventChannel((emitter) => {
        firebase.auth().onAuthStateChanged((user) => {
            emitter({ user });
        });

        return () => {
        };
    }, buffers.sliding(1));
}

export const setUserAction = (user) => ({
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

export const getUserLoginError = (error) => ({
    type: `USER_LOGIN_ERROR`,
    payload: {
        error,
    },
});

export const setIsLoggedInAction = (isLoggedIn) => ({
    type: `SET_USER_IS_LOGGED_IN`,
    payload: {
        isLoggedIn,
    },
});

function* logout() {
    yield call(firebase.auth().signOut);
}

function* login({ payload: { email, password } }) {
    try {
        yield put(getUserLoggingInAction());
        yield call(firebase.auth().signInWithEmailAndPassword, email, password);
    } catch (e) {
        yield put(getUserLoginError(e));
    }
}

function* register({ payload: { email, password, name } }) {
    try {
        yield call(firebase.auth().createUserWithEmailAndPassword, email, password);

        const userId = firebase.auth().currentUser.uid;

        yield call(db
            .collection(`users`)
            .doc(userId)
            .set, {
            name,
        });
    } catch (e) {
        yield put(getUserLoginError(e));
    }
}

export default function* () {
    const channel = yield call(createAuthStateChangedChannel);

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
