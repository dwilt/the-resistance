import {
    setPasswordAction,
    setEmailAction,
    setNameAction,
    setShowRegisterAction,
    setIsRegisteringAction,
    setErrorAction,
    setIsLoggingInAction
} from './login.actions';

import {
    createReducer,
} from 'helpers';

export default createReducer({
    password: ``,
    email: ``,
    name: ``,
    showRegister: true,
    isRegistering: false,
    error: null,
},{
    [setPasswordAction().type]: (state, { password }) => ({
        ...state,
        password,
    }),
    [setEmailAction().type]: (state, { email }) => ({
        ...state,
        email,
    }),
    [setNameAction().type]: (state, { name }) => ({
        ...state,
        name,
    }),
    [setShowRegisterAction().type]: (state, { showRegister }) => ({
        ...state,
        showRegister,
    }),
    [setIsRegisteringAction().type]: (state, { isRegistering }) => ({
        ...state,
        isRegistering,
    }),
    [setIsLoggingInAction().type]: (state, { isLoggingIn }) => ({
        ...state,
        isLoggingIn,
    }),
    [setErrorAction().type]: (state, { error }) => ({
        ...state,
        error,
    }),
});