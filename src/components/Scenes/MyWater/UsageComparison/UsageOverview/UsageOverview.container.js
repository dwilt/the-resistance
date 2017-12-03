import {
    connect,
} from 'react-redux';

import {
    myWaterTotalHouseholdsSelector,
    myWaterChartRadiusSelector,
} from '/selectors';

import UsageOverview from './UsageOverview.component';

export default connect(state => {
    const count = myWaterTotalHouseholdsSelector(state);
    const radius = myWaterChartRadiusSelector(state);

    return {
        count,
        radius,
    };
})(UsageOverview);
