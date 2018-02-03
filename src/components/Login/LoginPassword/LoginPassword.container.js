import {
    connect,
} from 'react-redux';

import {
    loginPasswordSelector,
} from 'selectors';

import {
    setPasswordAction as onChangeText,
} from 'store/login/login.actions';

import LoginPassword from './LoginPassword.component';

export default connect(state => {
    const value = loginPasswordSelector(state);

    return {
        value,
    };
}, {
    onChangeText,
})(LoginPassword);
