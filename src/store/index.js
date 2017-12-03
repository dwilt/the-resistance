import {
    AsyncStorage,
} from 'react-native';

import {
    createStore,
    applyMiddleware,
    compose,
} from 'redux';

import {
    persistStore,
    autoRehydrate,
} from 'redux-persist';

import createSagaMiddleware from 'redux-saga';

import reducer from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, {}, composeEnhancers(
    autoRehydrate(),
    applyMiddleware(
        sagaMiddleware
    )
));

sagaMiddleware.run(sagas);

const persistedState = {
    storage: AsyncStorage,
    whitelist: [
        `user`,
    ],
};

persistStore(store, persistedState);

export default store;
