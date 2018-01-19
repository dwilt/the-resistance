import { firebase } from 'services';

import { buffers, eventChannel } from 'redux-saga';

import SplashScreen from 'react-native-splash-screen'

import { call, take, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import { Home, Login } from 'components';

import {
   runAfterInteractions
} from 'helpers';

function createAuthStateChangedChannel() {
    return eventChannel((emitter) => {
        firebase.auth().onAuthStateChanged((user) => {
            emitter({ user });
        });

        return () => {};
    }, buffers.sliding(1));
}

export const setUserAction = (user) => ({
    type: `SET_USER`,
    payload: {
        user,
    },
});

export default function* init() {
    const channel = yield call(createAuthStateChangedChannel);

    while (true) {
        const { user } = yield take(channel);

        yield put(setUserAction(user));

        if (user) {
            Actions[Home.key]();

            yield call(runAfterInteractions);
        } else {
            Actions[Login.key]();
        }

        SplashScreen.hide();
    }
}
