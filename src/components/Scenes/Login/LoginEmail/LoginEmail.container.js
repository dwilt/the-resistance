import {
    connect,
} from 'react-redux';

import {
    loginEmailSelector,
} from '/selectors';

import {
    getEmailAction as onChangeText,
} from '/store/login/login.actions';

import EmailInput from './LoginEmail.component';

export default connect(state => {
    const value = loginEmailSelector(state);

    return {
        value,
    };
}, {
    onChangeText,
})(EmailInput);
