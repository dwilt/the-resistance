import {
    connect,
} from 'react-redux';

import {
    myWaterSelectedTimeFilterSelector,
    userProfileRateTiersSelector,
    myWaterChartOverlayUsageSelector,
} from '/selectors';

import MyWaterChartOverlayTiers from './MyWaterChartOverlayTiers.component';

export default connect(state => {
    const rateTiers = userProfileRateTiersSelector(state);
    const timeFilter = myWaterSelectedTimeFilterSelector(state);
    const usage = myWaterChartOverlayUsageSelector(state);

    return {
        rateTiers,
        timeFilter,
        usage,
    };
})(MyWaterChartOverlayTiers);
