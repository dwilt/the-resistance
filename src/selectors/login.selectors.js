import { createSelector } from 'reselect';

const loginSelector = (state) => state.login;

export const loginPasswordSelector = createSelector(
    loginSelector,
    (login) => login.password,
);

export const loginEmailSelector = createSelector(
    loginSelector,
    (login) => login.email,
);

export const loginNameSelector = createSelector(
    loginSelector,
    (login) => login.name,
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
