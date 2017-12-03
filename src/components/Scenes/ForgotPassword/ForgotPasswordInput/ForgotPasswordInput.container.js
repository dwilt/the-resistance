import {
    connect,
} from 'react-redux';

import {
    loginEmailSelector,
} from '/selectors';

import {
    getEmailAction as onChangeText,
} from '/store/login/login.actions';

import ForgotPasswordInput from './ForgotPasswordInput.component';

export default connect(state => {
    const value = loginEmailSelector(state);

    return {
        value,
    };
}, {
    onChangeText,
})(ForgotPasswordInput);
