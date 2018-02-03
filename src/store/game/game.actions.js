import { buffers, eventChannel } from "redux-saga";
import { call, take } from "redux-saga/effects";
import { db } from "services";

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

export const setGameCompletedMissionsAction = (completedMissions) => ({
    type: `SET_GAME_COMPLETED_MISSIONS`,
    payload: {
        completedMissions,
    },
});

export const setGameIdAction = (id) => ({
    type: `SET_GAME_ID`,
    payload: {
        id,
    },
});

function createGameListenerChannel(id) {
    return eventChannel((emitter) => {
        db
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

        yield put(setGameDataAction(data));
    }
}

function createPlayersListenerChannel(id) {
    return eventChannel((emitter) => {
        db
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

function createCompletedMissionsListenerChannel(id) {
    return eventChannel((emitter) => {
        db
            .collection(`games`)
            .doc(id)
            .collection(`completedMissions`)
            .onSnapshot(({ docs }) => {
                const missions = docs.map((doc) => doc.data());

                emitter(missions);
            });

        return () => {};
    }, buffers.sliding(2));
}

function* watchCompletedMissions(id) {
    const completedMissionsChannel = yield call(
        createCompletedMissionsListenerChannel,
        id,
    );

    while (true) {
        const players = yield take(completedMissionsChannel);

        yield put(setGameCompletedMissionsAction(players));
    }
}

export function* join({ id, data, players, completedMissions }) {
    yield put(setGameDataAction(data));
    yield put(setGameIdAction(id));
    yield put(setGamePlayersAction(players));
    yield put(setGameCompletedMissionsAction(completedMissions));

    yield all([
        call(watchGameData, id),
        call(watchPlayers, id),
        call(watchCompletedMissions, id),
    ]);
}