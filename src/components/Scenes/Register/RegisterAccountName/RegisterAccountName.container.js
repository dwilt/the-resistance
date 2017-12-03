import {
    connect,
} from 'react-redux';

import {
    getSetAccountNameAction as onChangeText,
} from '/store/register/register.actions';

import {
    registerAccountNameSelector,
} from '/selectors';

import AccountName from './RegisterAccountName.component';

export default connect(st => {
    const value = registerAccountNameSelector(st);

    return {
        value,
    };
}, {
    onChangeText,
})(AccountName);
