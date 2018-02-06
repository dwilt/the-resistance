import { setIsOpenAction } from './gameMenu.actions';

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
