import { rsf } from 'services';

import firebase from 'firebase';

import { call, take, put, takeEvery, all, select } from 'redux-saga/effects';

import { Actions } from 'react-native-router-flux';

import { Login } from 'components';

import { runAfterInteractions } from 'services';

import { userSelector } from 'selectors';

export const setUserAction = (user = {}) => ({
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
    Actions.reset();

    yield call(rsf.auth.signOut);
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

        // TODO: this is bs because the currentUser.updateProfile method can't take an initial profile object
        // https://github.com/firebase/firebase-functions/issues/95#issuecomment-363457520
        yield put(
            setUserAction({
                displayName: name,
            }),
        );

        yield call(rsf.auth.createUserWithEmailAndPassword, email, password);

        const currentUser = firebase.auth().currentUser;

        yield all([
            call(rsf.firestore.setDocument, `users/${currentUser.uid}`, {
                name,
            }),
        ]);

        // TODO: temporarily here until support - https://github.com/n6g7/redux-saga-firebase/issues/48
        yield currentUser.updateProfile({
            displayName: name,
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

        if (user) {
            const currentUser = yield select(userSelector);
            const { uid, displayName } = user;

            yield put(
                setUserAction({
                    ...currentUser,
                    uid,
                    // TODO more bs hacks because of https://github.com/firebase/firebase-functions/issues/95#issuecomment-363457520
                    displayName: displayName || currentUser.displayName,
                }),
            );

            yield put(getUserLoggedInAction());
            yield put(setIsLoggedInAction(true));
        } else {
            yield put(setUserAction());
            yield put(getUserLoggedOutAction());
            yield put(setIsLoggedInAction(false));
        }
    }
}
