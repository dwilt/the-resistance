import {
    connect,
} from 'react-redux';

import {
    inboxMessagesGetMessageSubjectSelector,
    inboxMessagesGetMessageDateSelector,
} from '/selectors';

import {
    goToMessageAction as onPress,
} from '/store/inbox/inbox.actions';

import InboxListItem from './InboxListItem.component';

export default connect((state, { id }) => {
    const subject = inboxMessagesGetMessageSubjectSelector(state, id);
    const date = inboxMessagesGetMessageDateSelector(state, id);

    return {
        subject,
        date,
    };
}, {
    onPress,
})(InboxListItem);
