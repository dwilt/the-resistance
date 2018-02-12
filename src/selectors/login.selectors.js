import { emailIsValid } from 'helpers';

import { createSelector } from 'reselect';

const loginSelector = (state) => state.login;

export const loginPasswordSelector = createSelector(
    loginSelector,
    (login) => login.password,
);

export const loginPasswordIsValidSelector = createSelector(
    loginPasswordSelector,
    (password) => password.length >= 6,
);

export const loginEmailSelector = createSelector(
    loginSelector,
    (login) => login.email,
);

export const loginEmailIsValidSelector = createSelector(
    loginSelector,
    (login) => emailIsValid(login.email),
);

export const loginNameSelector = createSelector(
    loginSelector,
    (login) => login.name,
);

export const loginNameIsValidSelector = createSelector(
    loginNameSelector,
    (name) => name.length > 0,
);

export const loginShowingRegisterFormSelector = createSelector(
    loginSelector,
    (login) => login.showRegister,
);

export const loginIsRegisteringSelector = createSelector(
    loginSelector,
    (login) => login.isRegistering,
);

export const loginIsLoggingInSelector = createSelector(
    loginSelector,
    (login) => login.isLoggingIn,
);

export const loginErrorSelector = createSelector(
    loginSelector,
    (login) => login.error,
);

export const loginRegisterFormIsValidSelector = createSelector(
    [
        loginEmailIsValidSelector,
        loginPasswordIsValidSelector,
        loginNameIsValidSelector,
    ],
    (emailIsValid, passwordIsValid, nameIsValid) =>
        emailIsValid && passwordIsValid && nameIsValid,
);

export const loginLoginFormIsValidSelector = createSelector(
    [loginEmailIsValidSelector, loginPasswordIsValidSelector],
    (emailIsValid, passwordIsValid) => emailIsValid && passwordIsValid,
);
