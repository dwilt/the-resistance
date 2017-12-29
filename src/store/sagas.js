import { all } from 'redux-saga/effects';

import gameSaga from 'store/game/game.actions';
import userSaga from 'store/user/user.actions';

export default function* sagas() {
    yield all([gameSaga(), userSaga()]);
}