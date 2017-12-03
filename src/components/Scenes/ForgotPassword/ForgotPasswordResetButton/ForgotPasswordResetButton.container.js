import {
    connect,
} from 'react-redux';

import {
    loginEmailIsValidSelector,
    forgotPasswordIsResettingSelector,
} from '/selectors';

import {
    getForgotPasswordResetOnPressAction as onPress,
} from '/store/forgotPassword/forgotPassword.actions';

import ForgotPasswordResetButton from './ForgotPasswordResetButton.component';

export default connect(st => {
    const formIsValid = loginEmailIsValidSelector(st);
    const isResetting = forgotPasswordIsResettingSelector(st);

    return {
        formIsValid,
        isResetting,
    };
}, {
    onPress,
})(ForgotPasswordResetButton);
