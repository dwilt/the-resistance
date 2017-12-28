import { createSelector } from 'reselect';

const gameSelector = (state) => state.game;

const gameDataSelector = (state) => state.game.data;

export const gameIdSelector = createSelector(gameSelector, (game) => game.id);

export const gameStateSelector = createSelector(
    gameDataSelector,
    (game) => game.state,
);

export const gameCodeSelector = createSelector(
    gameDataSelector,
    (game) => game.gameCode,
);

export const gameHostSelector = createSelector(
    gameDataSelector,
    (game) => game.host,
);

export const gamePlayersSelector = createSelector(
    gameSelector,
    (game) => game.players,
);
