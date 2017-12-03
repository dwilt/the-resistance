import {
    connect,
} from 'react-redux';

import {
    getDecrementDateRangeAction as onPress,
} from '/store/myWater/myWater.actions';

import DateRangeDecrementButton from './DateRangeDecrementButton.component';

export default connect(null, {
    onPress,
})(DateRangeDecrementButton);
