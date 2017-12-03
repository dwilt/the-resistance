import {
    connect,
} from 'react-redux';

import {
    myWaterDateRangeEndDateSelector,
    myWaterSelectedTimeFilterSelector,
} from '/selectors';

import {
    getIncrementDateRangeAction as onPress,
} from '/store/myWater/myWater.actions';

import DateRangeIncrementButton from './DateRangeIncrementButton.component';

export default connect(state => {
    const endDate = myWaterDateRangeEndDateSelector(state);
    const timeFilter = myWaterSelectedTimeFilterSelector(state);

    return {
        endDate,
        timeFilter,
    };
}, {
    onPress,
})(DateRangeIncrementButton);
