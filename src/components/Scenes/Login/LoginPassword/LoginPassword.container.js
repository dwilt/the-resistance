import {
    connect,
} from 'react-redux';

import {
   loginPasswordSelector,
} from '/selectors';

import {
    getPasswordAction as onChangeText,
} from '/store/login/login.actions';

import PasswordInput from './LoginPassword.component';

export default connect(state => {
    const value = loginPasswordSelector(state);

    return {
        value,
    };
}, {
    onChangeText,
})(PasswordInput);
