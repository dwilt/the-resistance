import {
    connect,
} from 'react-redux';

import {
    getLawnAction as onValueChange,
} from '/store/user/user.actions';

import {
    userProfileLawnSelector,
} from '/selectors';

import LawnSwitch from './LawnSwitch.component';

export default connect(state => {
    const value = userProfileLawnSelector(state);

    return {
        value,
    };
}, {
    onValueChange,
})(LawnSwitch);
