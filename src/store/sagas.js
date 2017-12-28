import {
    all,
} from 'redux-saga/effects';

import gameSaga from 'store/game/game.actions';

export default function* sagas() {
    yield all([
        gameSaga(),
    ]);
}
