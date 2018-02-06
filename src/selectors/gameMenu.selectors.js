import { createSelector } from 'reselect';

const gameMenuSelector = (state) => state.gameMenu;

export const gameMenuIsOpenSelector = createSelector(
    gameMenuSelector,
    (gameMenu) => gameMenu.isOpen,
);
