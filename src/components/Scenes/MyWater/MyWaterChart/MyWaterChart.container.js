import {
    connect,
} from 'react-redux';

import {
    myWaterUsageSelector,
    myWaterSelectedTimeFilterSelector,
    userProfileMeasurementIntervalSelector,
    userProfileRateTiersSelector,
    myWaterChartStateSelector,
} from '/selectors';

import {
    getUsageAction as getUsage,
    getOnBarPressAction as onBarPress,
} from '/store/myWater/myWater.actions';

import MyWaterChart from './MyWaterChart.component';

export default connect(st => {
    const data = myWaterUsageSelector(st);
    const state = myWaterChartStateSelector(st);
    const timeFilter = myWaterSelectedTimeFilterSelector(st);
    const userInterval = userProfileMeasurementIntervalSelector(st);
    const rateTiers = userProfileRateTiersSelector(st);

    return {
        state,
        data,
        timeFilter,
        userInterval,
        rateTiers,
    };
}, {
    getUsage,
    onBarPress,
})(MyWaterChart);
