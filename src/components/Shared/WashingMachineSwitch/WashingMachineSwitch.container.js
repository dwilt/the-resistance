import {
    connect,
} from 'react-redux';

import {
    getWashingMachineAction as onValueChange,
} from '/store/user/user.actions';

import {
    userProfileWashingMachineSelector,
} from '/selectors';

import WashingMachineSwitch from './WashingMachineSwitch.component';

export default connect(state => {
    const value = userProfileWashingMachineSelector(state);

    return {
        value,
    };
}, {
    onValueChange,
})(WashingMachineSwitch);
