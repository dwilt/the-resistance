import {
    connect,
} from 'react-redux';

import {
    userProfileEmailSelector,
} from '/selectors';

import ProfileEmailInput from './ProfileEmailInput.component';

export default connect(state => {
    const email = userProfileEmailSelector(state);

    return {
        email,
    };
})(ProfileEmailInput);
