import {
    connect,
} from 'react-redux';

import {
    inboxIsSyncingSelector,
} from '/selectors';

import InboxActivityIndicator from './InboxActivityIndicator.component';

export default connect(state => {
    const show = inboxIsSyncingSelector(state);

    return {
        show,
    };
})(InboxActivityIndicator);
