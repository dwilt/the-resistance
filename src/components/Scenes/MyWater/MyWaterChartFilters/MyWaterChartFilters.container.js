import {
    connect,
} from 'react-redux';

import {
    myWaterSelectedTimeFilterSelector,
    userProfileMeasurementIntervalSelector,
} from '/selectors';

import {
    getSelectedTimeFilterAction as onFilterPress,
} from '/store/myWater/myWater.actions';

import MyWaterChartFilters from './MyWaterChartFilters.component';

export default connect(state => {
    const activeFilter = myWaterSelectedTimeFilterSelector(state);
    const measurementInterval = userProfileMeasurementIntervalSelector(state);

    return {
        activeFilter,
        measurementInterval,
    };
}, {
    onFilterPress,
})(MyWaterChartFilters);
