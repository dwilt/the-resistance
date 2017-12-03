import {
    connect,
} from 'react-redux';

import {
    getSetAccountIdAction as onChangeText,
} from '/store/register/register.actions';

import {
    registerAccountIdSelector,
} from '/selectors';

import AccountId from './RegisterAccountId.component';

export default connect(st => {
    const value = registerAccountIdSelector(st);

    return {
        value,
    };
}, {
    onChangeText,
})(AccountId);
