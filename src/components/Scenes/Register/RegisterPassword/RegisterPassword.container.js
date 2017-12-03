import {
    connect,
} from 'react-redux';

import {
    getSetPasswordAction as onChangeText,
} from '/store/register/register.actions';

import {
    registerPasswordSelector,
} from '/selectors';

import PasswordInput from './RegisterPassword.component';

export default connect(st => {
    const value = registerPasswordSelector(st);

    return {
        value,
    };
}, {
    onChangeText,
})(PasswordInput);
