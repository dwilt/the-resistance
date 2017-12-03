import {
    connect,
} from 'react-redux';

import {
    getSprinklerAction as onValueChange,
} from '/store/user/user.actions';

import {
    userProfileSprinklerSelector,
} from '/selectors';

import SprinklerSwitch from './SprinklerSwitch.component';

export default connect(state => {
    const value = userProfileSprinklerSelector(state);

    return {
        value,
    };
}, {
    onValueChange,
})(SprinklerSwitch);
