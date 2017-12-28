import { Actions } from 'react-native-router-flux';

import { takeEvery, take, call } from 'redux-saga/effects';

import { buffers, eventChannel } from 'redux-saga';

import { db, firebase, fireFetch } from 'services';

import {
   Game
} from 'components';

export const joinGameAction = (gameCode) => ({
    type: `JOIN_GAME`,
    payload: {
        gameCode,
    },
});

export const setGameAction = (game) => ({
    type: `SET_GAME`,
    payload: {
        game,
    },
});

let gameListener = null;

function createGameListenerChannel(gameId) {
    return eventChannel(emitter => {
        gameListener = db
            .collection(`games`)
            .doc(gameId)
            .onSnapshot((snapshot) => {
                const data = snapshot.data();

                if(data) {
                    emitter({ data })
                }
            });

        return () => {

        }
    }, buffers.sliding(2));
}

function* joinGame({ payload: { gameCode } }) {
    const userId = firebase.auth().currentUser.uid;

    const { gameId } = call(fireFetch, [
        `joinGame`,
        {
            gameCode,
            userId,
        },
    ]);

    Actions[Game.key]({
        gameCode,
        gameId,
    });

    const channel = yield call(createGameListenerChannel, gameId);

    while (true) {
        const { data } = yield take(channel);

        if (data) {
            yield put(setGameAction(data));
        }
    }
}

export default function*() {
    yield takeEvery(joinGameAction().type, joinGame);
}
