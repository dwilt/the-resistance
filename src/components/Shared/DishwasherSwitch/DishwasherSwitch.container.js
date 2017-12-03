import {
    connect,
} from 'react-redux';

import {
    getDishwasherAction as onValueChange,
} from '/store/user/user.actions';

import {
    userProfileDishwasherSelector,
} from '/selectors';

import DishwasherSwitch from './DishwasherSwitch.component';

export default connect(state => {
    const value = userProfileDishwasherSelector(state);

    return {
        value,
    };
}, {
    onValueChange,
})(DishwasherSwitch);
