import {
    setIsOpenAction,
    setIsSubmittingAction,
} from './forgotPasswordMenu.actions';

import { createReducer } from 'helpers';

export default createReducer(
    {
        isOpen: false,
        isSubmitting: false,
    },
    {
        [setIsOpenAction().type]: (state, { isOpen }) => ({
            ...state,
            isOpen,
        }),
        [setIsSubmittingAction().type]: (state, { isSubmitting }) => ({
            ...state,
            isSubmitting,
        }),
    },
);
