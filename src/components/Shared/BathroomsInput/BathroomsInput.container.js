import {
    connect,
} from 'react-redux';

import {
    userProfileBathroomsSelector,
} from '/selectors';

import {
    getIncrementBathroomsAction as onIncrement,
    getDecrementBathroomsAction as onDecrement,
} from '/store/user/user.actions';

import BathroomsInput from './BathroomsInput.component';

export default connect(state => {
    const value = userProfileBathroomsSelector(state);

    return {
        value,
    };
}, {
    onIncrement,
    onDecrement,
})(BathroomsInput);
