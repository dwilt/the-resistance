import { createSelector } from 'reselect';

const menuSelector = (state) => state.menu;

export const menuIsOpenSelector = createSelector(
    menuSelector,
    (menu) => menu.isOpen,
);
