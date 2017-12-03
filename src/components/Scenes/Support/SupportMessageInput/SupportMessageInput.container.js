import {
    connect,
} from 'react-redux';

import {
    supportMessageSelector,
} from '/selectors';

import {
    getMessageAction as onChangeText,
} from '/store/support/support.actions';

import SupportMessageInput from './SupportMessageInput.component';

export default connect(state => {
    const value = supportMessageSelector(state);

    return {
        value,
    };
}, {
    onChangeText,
})(SupportMessageInput);
