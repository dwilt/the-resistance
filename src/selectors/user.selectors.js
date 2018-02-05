import { createSelector } from 'reselect';

const userSelector = (state) => state.user;

export const userIdSelector = createSelector(userSelector, (user) => user.user.uid);
