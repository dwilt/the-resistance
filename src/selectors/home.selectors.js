import { createSelector } from "reselect";

const homeSelector = state => state.home;

export const homeIsJoiningGameSelector = createSelector(
    homeSelector,
    home => home.isJoiningGame
);

export const homeIsCreatingGameSelector = createSelector(
    homeSelector,
    home => home.isCreatingGame
);

export const showJoinGameOverlaySelector = createSelector(
    homeSelector,
    home => home.showJoinGameOverlay
);

export const homeErrorSelector = createSelector(
    homeSelector,
    home => home.error
);

export const joinGameInputSelector = createSelector(
    homeSelector,
    home => home.joinGameInput
);
