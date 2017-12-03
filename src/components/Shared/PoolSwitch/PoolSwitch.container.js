import {
    connect,
} from 'react-redux';

import {
    getPoolAction as onValueChange,
} from '/store/user/user.actions';

import {
    userProfilePoolSelector,
} from '/selectors';

import PoolSwitch from './PoolSwitch.component';

export default connect(state => {
    const value = userProfilePoolSelector(state);

    return {
        value,
    };
}, {
    onValueChange,
})(PoolSwitch);
