import {
    connect,
} from 'react-redux';

import {
    myWaterDateRangeStartDateSelector,
    myWaterDateRangeEndDateSelector,
    myWaterSelectedTimeFilterSelector,
} from '/selectors';

import MyWaterChartDateRange from './MyWaterChartDateRange.component';

export default connect(state => {
    const startDate = myWaterDateRangeStartDateSelector(state);
    const endDate = myWaterDateRangeEndDateSelector(state);
    const timeFilter = myWaterSelectedTimeFilterSelector(state);

    return {
        startDate,
        endDate,
        timeFilter,
    };
})(MyWaterChartDateRange);
