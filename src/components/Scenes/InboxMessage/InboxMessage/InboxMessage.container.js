import {
    connect,
} from 'react-redux';

import {
    inboxMessageSubjectSelector,
} from '/selectors';

import {
    fetchInboxMessageAction as fetchMessage,
} from '/store/inboxMessage/inboxMessage.actions';

import InboxMessage from './InboxMessage.component';

export default connect(state => {
    const subject = inboxMessageSubjectSelector(state);

    return {
        subject,
    };
}, {
    fetchMessage,
})(InboxMessage);
