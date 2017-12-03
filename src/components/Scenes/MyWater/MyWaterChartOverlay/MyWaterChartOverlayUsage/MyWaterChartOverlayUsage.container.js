import {
    connect,
} from 'react-redux';

import {
    myWaterChartOverlayUsageSelector,
} from '/selectors';

import MyWaterChartOverlayUsage from './MyWaterChartOverlayUsage.component';

export default connect(state => {
    const usage = myWaterChartOverlayUsageSelector(state);

    return {
        usage,
    };
})(MyWaterChartOverlayUsage);
