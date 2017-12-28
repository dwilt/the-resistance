import {
    createReducer,
} from 'helpers';

export default createReducer(null, {
    [`SET_GAME`]: (state, { game }) => game
});
