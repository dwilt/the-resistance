import { put, all, fork } from "redux-saga/effects";

import { rsf } from "services";

import {
    Game
} from 'components';

import {
    Actions
} from 'react-native-router-flux';

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

export function* join({ id, data, players, completedMissions }) {
    yield put(setGameDataAction(data));
    yield put(setGameIdAction(id));
    yield put(setGamePlayersAction(players));
    yield put(setGameCompletedMissionsAction(completedMissions));

    yield all([
        fork(rsf.firestore.syncCollection, `games/${id}/players`, {
                successActionCreator: ({ docs }) => {
                    const players = docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    return setGamePlayersAction(players);
                }
            },
        ),
        fork(rsf.firestore.syncCollection, `games/${id}/completedMissions`, {
                successActionCreator: ({ docs }) => {
                    const missions = docs.map((doc) => doc.data());

                    return setGameCompletedMissionsAction(missions);
                }
            },
        ),
        fork(rsf.firestore.syncDocument, `games/${id}`, {
                successActionCreator: (snapshot) => {
                    const data = snapshot.data();

                    return setGameDataAction(data);
                }
            },
        )
    ]);

    Actions[Game.key]();
}