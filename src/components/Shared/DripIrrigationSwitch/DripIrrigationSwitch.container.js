import {
    connect,
} from 'react-redux';

import {
    getDripIrrigationAction as onValueChange,
} from '/store/user/user.actions';

import {
    userProfileDripIrrigationSelector,
} from '/selectors';

import DripIrrigationSwitch from './DripIrrigationSwitch.component';

export default connect(state => {
    const value = userProfileDripIrrigationSelector(state);

    return {
        value,
    };
}, {
    onValueChange,
})(DripIrrigationSwitch);
