import {
    setIsOpenAction,
    setIsSubmittingAction,
    setErrorAction,
} from './forgotPasswordMenu.actions';

import { createReducer } from 'helpers';

export default createReducer(
    {
        isOpen: false,
        isSubmitting: false,
        error: null,
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
        [setErrorAction().type]: (state, { error }) => ({
            ...state,
            error,
        }),
    },
);
