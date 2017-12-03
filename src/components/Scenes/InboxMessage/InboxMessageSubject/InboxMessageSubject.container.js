import {
    connect,
} from 'react-redux';

import {
    inboxMessageSubjectSelector,
} from '/selectors';

import InboxMessageSubject from './InboxMessageSubject.component';

export default connect(state => {
    const subject = inboxMessageSubjectSelector(state);

    return {
        subject,
    };
})(InboxMessageSubject);
