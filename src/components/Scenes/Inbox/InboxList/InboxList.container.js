import {
    connect,
} from 'react-redux';

import {
    inboxMessagesPreviewSelector,
} from '/selectors';

import {
    syncInboxMessagesAction as sync,
} from '/store/inbox/inbox.actions';

import InboxList from './InboxList.component';

export default connect(state => {
    const messages = inboxMessagesPreviewSelector(state);

    return {
        messages,
    };
}, {
    sync,
})(InboxList);
