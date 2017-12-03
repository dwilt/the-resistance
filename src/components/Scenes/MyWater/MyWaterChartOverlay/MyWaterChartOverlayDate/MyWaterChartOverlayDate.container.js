import {
    connect,
} from 'react-redux';

import {
    myWaterChartOverlayStartDateSelector,
    myWaterChartOverlayEndDateSelector,
    myWaterSelectedTimeFilterSelector,
} from '/selectors';

import {

} from '/store/';

import MyWaterChartOverlayDate from './MyWaterChartOverlayDate.component';

export default connect(state => {
    const startDate = myWaterChartOverlayStartDateSelector(state);
    const endDate = myWaterChartOverlayEndDateSelector(state);
    const timeFilter = myWaterSelectedTimeFilterSelector(state);

    return {
        startDate,
        endDate,
        timeFilter,
    };
})(MyWaterChartOverlayDate);
