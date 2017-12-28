import { Actions } from 'react-native-router-flux';

import {
    takeEvery,
    take,
    call,
    select,
    put,
    all,
    takeLatest,
} from 'redux-saga/effects';

import { buffers, eventChannel } from 'redux-saga';

import { db, fireFetch } from 'services';

import {
    userIdSelector,
    homeJoinGameInputSelector,
    gameIdSelector,
    proposedMissionTeamSelector,
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

export const joinGameAction = () => ({
    type: `JOIN_GAME`,
});

export const startGameAction = () => ({
    type: `START_GAME`,
});

export const confirmMissionTeamAction = () => ({
    type: `CONFIRM_MISSION_TEAM`,
});

export const confirmPlayerIdentityAction = () => ({
    type: `confirmPlayerIdentityAction`,
});

export const toggleMissionTeamMemberAction = (userId, selected) => ({
    type: `TOGGLE_MISSION_MEMBER`,
    payload: {
        userId,
        selected,
    },
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

function createCompletedMissionsListenerChannel(id) {
    return eventChannel((emitter) => {
        gameListener = db
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

    yield all([
        call(watchGameData, id),
        call(watchPlayers, id),
        call(watchCompletedMissions, id),
    ]);
}

function* startGame() {
    const gameId = yield select(gameIdSelector);

    yield call(fireFetch, `startGame`, {
        gameId,
    });
}

function* confirmMissionTeam() {
    const gameId = yield select(gameIdSelector);

    yield call(fireFetch, `confirmSelectedMissionTeam`, {
        gameId,
    });
}

function* updateProposedMissionTeam() {
    const gameId = yield select(gameIdSelector);
    const team = yield select(proposedMissionTeamSelector);

    yield call(fireFetch, `updateProposedMissionTeam`, {
        gameId,
        team,
    });
}

function* confirmPlayerIdentity() {
    const gameId = yield select(gameIdSelector);
    const userId = yield select(userIdSelector);

    yield call(fireFetch, `confirmPlayerIdentity`, {
        gameId,
        userId,
    });
}

export default function*() {
    yield takeEvery(joinGameAction().type, joinGame);
    yield takeEvery(startGameAction().type, startGame);
    yield takeEvery(confirmMissionTeamAction().type, confirmMissionTeam);
    yield takeEvery(confirmPlayerIdentityAction().type, confirmPlayerIdentity);
    yield takeLatest(
        toggleMissionTeamMemberAction().type,
        updateProposedMissionTeam,
    );
}
