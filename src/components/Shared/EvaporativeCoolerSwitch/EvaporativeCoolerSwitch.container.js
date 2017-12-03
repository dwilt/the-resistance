import {
    connect,
} from 'react-redux';

import {
    getEvaporativeCoolerAction as onValueChange,
} from '/store/user/user.actions';

import {
    userProfileEvaporativeCoolerSelector,
} from '/selectors';

import EvaporativeCoolerSwitch from './EvaporativeCoolerSwitch.component';

export default connect(state => {
    const value = userProfileEvaporativeCoolerSelector(state);

    return {
        value,
    };
}, {
    onValueChange,
})(EvaporativeCoolerSwitch);
