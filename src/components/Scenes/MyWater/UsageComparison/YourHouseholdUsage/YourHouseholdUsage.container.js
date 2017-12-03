import {
    connect,
} from 'react-redux';

import {
    myWaterTotalUsageSelector,
    myWaterMaxUsageSelectorSelector,
} from '/selectors';

import YourHouseholdUsage from './YourHouseholdUsage.component';

export default connect(state => {
    const usage = myWaterTotalUsageSelector(state);
    const max = myWaterMaxUsageSelectorSelector(state);

    return {
        usage,
        max,
    };
})(YourHouseholdUsage);
