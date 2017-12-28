import { Actions } from 'react-native-router-flux';

import { takeEvery, take, call, select, put, all } from 'redux-saga/effects';

import { buffers, eventChannel } from 'redux-saga';

import { db, fireFetch } from 'services';

import {
    userIdSelector,
    homeJoinGameInputSelector,
    gameIdSelector,
} from 'selectors';

import { Game } from 'components';

export const setGameDataAction = (data) => ({
    type: `SET_GAME_DATA`,
    payload: {
        data,
    },
});

export const setGamePlayersAction = (players) => ({
    type: `SET_GAME_PLAYERS`,
    payload: {
        players,
    },
});

export const setGameIdAction = (id) => ({
    type: `SET_GAME_ID`,
    payload: {
        id,
    },
});

export const joinGameAction = () => ({
    type: `JOIN_GAME`,
});

export const startGameAction = () => ({
    type: `START_GAME`,
});

let gameListener = null;

function createGameListenerChannel(id) {
    return eventChannel((emitter) => {
        gameListener = db
            .collection(`games`)
            .doc(id)
            .onSnapshot((snapshot) => {
                const data = snapshot.data();

                if (data) {
                    emitter(data);
                }
            });

        return () => {};
    }, buffers.sliding(2));
}

function* watchGameData(id) {
    const gameChannel = yield call(createGameListenerChannel, id);

    while (true) {
        const data = yield take(gameChannel);

        console.log(`data`, data);

        yield put(setGameDataAction(data));
    }
}

function createPlayersListenerChannel(id) {
    return eventChannel((emitter) => {
        gameListener = db
            .collection(`games`)
            .doc(id)
            .collection(`players`)
            .onSnapshot(({ docs }) => {
                const players = docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                emitter(players);
            });

        return () => {};
    }, buffers.sliding(2));
}

function* watchPlayers(id) {
    const playersChannel = yield call(createPlayersListenerChannel, id);

    while (true) {
        const players = yield take(playersChannel);

        yield put(setGamePlayersAction(players));
    }
}

function* joinGame() {
    const userId = yield select(userIdSelector);
    const gameCode = yield select(homeJoinGameInputSelector);

    const { id, data, players } = yield call(fireFetch, `joinGame`, {
        gameCode,
        userId,
    });

    yield put(setGameDataAction(data));
    yield put(setGameIdAction(id));
    yield put(setGamePlayersAction(players));

    Actions[Game.key]();

    yield all([call(watchGameData, id), call(watchPlayers, id)]);
}

function* startGame() {
    const gameId = yield select(gameIdSelector);

    yield call(fireFetch, `startGame`, {
        gameId,
    });
}

export default function*() {
    yield takeEvery(joinGameAction().type, joinGame);
    yield takeEvery(startGameAction().type, startGame);
}
