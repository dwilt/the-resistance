import {
    connect,
} from 'react-redux';

import {
    userProfilePeopleSelector,
} from '/selectors';

import {
    getIncrementPeopleAction as onIncrement,
    getDecrementPeopleAction as onDecrement,
} from '/store/user/user.actions';

import HouseholdSizeInput from './HouseholdSizeInput.component';

export default connect(state => {
    const value = userProfilePeopleSelector(state);

    return {
        value,
    };
}, {
    onIncrement,
    onDecrement,
})(HouseholdSizeInput);
