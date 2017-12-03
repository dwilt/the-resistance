import {
    connect,
} from 'react-redux';

import {
    supportFormIsValidSelector,
    supportIsSendingSelector,
} from '/selectors';

import {
    getSendAction as onPress,
} from '/store/support/support.actions';

import SupportSendButton from './SupportSendButton.component';

export default connect(st => {
    const formIsValid = supportFormIsValidSelector(st);
    const isSending = supportIsSendingSelector(st);

    return {
        formIsValid,
        isSending,
    };
}, {
    onPress,
})(SupportSendButton);
