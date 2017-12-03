import {
    connect,
} from 'react-redux';

import {
    inboxMessageBodySelector,
} from '/selectors';

import InboxMessageBody from './InboxMessageBody.component';

export default connect(state => {
    const body = inboxMessageBodySelector(state);

    return {
        body,
    };
})(InboxMessageBody);
