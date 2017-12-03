import {
    connect,
} from 'react-redux';

import {
    getSetEmailAction as onChangeText,
} from '/store/register/register.actions';

import {
    registerEmailSelector,
} from '/selectors';

import EmailInput from './RegisterEmail.component';

export default connect(st => {
    const value = registerEmailSelector(st);

    return {
        value,
    };
}, {
    onChangeText,
})(EmailInput);
