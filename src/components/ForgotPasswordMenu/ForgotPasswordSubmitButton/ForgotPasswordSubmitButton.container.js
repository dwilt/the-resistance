import { connect } from 'react-redux';

import { forgotPasswordMenuIsSubmittingSelector } from 'selectors';

import { getSubmitForgotPasswordAction as onPress } from 'store/forgotPasswordMenu/forgotPasswordMenu.actions';

import ForgotPasswordSubmitButton from './ForgotPasswordSubmitButton.component';

export default connect(
    (state) => {
        const isLoading = forgotPasswordMenuIsSubmittingSelector(state);

        return {
            isLoading,
        };
    },
    {
        onPress,
    },
)(ForgotPasswordSubmitButton);
