import { createSelector } from 'reselect';

export const userSelector = (state) => state.user.user;

export const userIdSelector = createSelector(userSelector, (user) => user.uid);

export const userDisplayNameSelector = createSelector(
    userSelector,
    (user) => user.displayName,
);
