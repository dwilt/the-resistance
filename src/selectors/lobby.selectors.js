import { createSelector } from "reselect";

const lobbySelector = state => state.lobby;

export const lobbyIsStartingGameSelector = createSelector(
    lobbySelector,
    lobby => lobby.isStartingGame
);
