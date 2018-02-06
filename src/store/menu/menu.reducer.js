import { setIsOpenAction } from './menu.actions';

import { createReducer } from 'helpers';

export default createReducer(
    {
        isOpen: false,
    },
    {
        [setIsOpenAction().type]: (state, { isOpen }) => ({
            ...state,
            isOpen,
        }),
    },
);
