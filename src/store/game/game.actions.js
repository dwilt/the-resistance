import { Actions } from "react-native-router-flux";

import { takeEvery, call } from 'redux-saga/effects';

import { db, firebase, fireFetch } from '../../services';

export const joinGameAction = (gameCode) => ({
    type: `JOIN_GAME`,
    payload: {
        gameCode
    }
});

export const setGameAction = (game) => ({
    type: `SET_GAME`,
    payload: {
        game
    }
});

let gameListener = null;

function* joinGame({ payload: { gameCode } }) {
    const userId = firebase.auth().currentUser.uid;

    const { gameId } = call(fireFetch, [`joinGame`, {
        gameCode,
        userId,
    }]);

    Actions[Game.key]({
        gameCode,
        gameId,
    });

    gameListener = db
        .collection(`games`)
        .doc(gameId)
        .onSnapshot((snapshot) => {
            const data = snapshot.data();

            if (data) {
                // store.dispatch(setGameAction(data))
            }
        });
}

export default function*() {
    yield takeEvery(joinGameAction().type, joinGame);
}
