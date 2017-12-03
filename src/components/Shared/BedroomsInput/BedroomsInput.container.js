import {
    connect,
} from 'react-redux';

import {
    userProfileBedroomsSelector,
} from '/selectors';

import {
    getIncrementBedroomsAction as onIncrement,
    getDecrementBedroomsAction as onDecrement,
} from '/store/user/user.actions';

import BedroomsInput from './BedroomsInput.component';

export default connect(state => {
    const value = userProfileBedroomsSelector(state);

    return {
        value,
    };
}, {
    onIncrement,
    onDecrement,
})(BedroomsInput);
