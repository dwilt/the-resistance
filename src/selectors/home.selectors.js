import {
    createSelector,
} from 'reselect';

const homeSelector = state => state.home;

export const homeJoinGameInputSelector = createSelector(
    homeSelector,
    home => home.joinGameInput
);