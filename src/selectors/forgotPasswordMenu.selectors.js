import { createSelector } from 'reselect';

const forgotPasswordMenuSelector = (state) => state.forgotPasswordMenu;

export const forgotPasswordMenuIsOpenSelector = createSelector(
    forgotPasswordMenuSelector,
    (forgotPasswordMenu) => forgotPasswordMenu.isOpen,
);

export const forgotPasswordMenuIsSubmittingSelector = createSelector(
    forgotPasswordMenuSelector,
    (forgotPasswordMenu) => forgotPasswordMenu.isSubmitting,
);

export const forgotPasswordMenuErrorSelector = createSelector(
    forgotPasswordMenuSelector,
    (forgotPasswordMenu) => forgotPasswordMenu.error,
);
