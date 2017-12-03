import {
    connect,
} from 'react-redux';

import {
    getLoginOnPressAction as onPress,
} from '/store/login/login.actions';

import {
    loginIsLoggingInSelector,
    loginFormIsValidSelector,
} from '/selectors';

import LoginButton from './LoginButton.component';

export default connect(st => {
    const isLoggingIn = loginIsLoggingInSelector(st);
    const formIsValid = loginFormIsValidSelector(st);

    return {
        isLoggingIn,
        formIsValid,
    };
}, {
    onPress,
})(LoginButton);
