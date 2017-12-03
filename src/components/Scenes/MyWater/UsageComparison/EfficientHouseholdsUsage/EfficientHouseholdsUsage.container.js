import {
    connect,
} from 'react-redux';

import {
    myWaterEfficientHouseholdsSelector,
    myWaterMaxUsageSelectorSelector,
} from '/selectors';

import EfficientHouseholdsUsage from './EfficientHouseholdsUsage.component';

export default connect(state => {
    const usage = myWaterEfficientHouseholdsSelector(state);
    const max = myWaterMaxUsageSelectorSelector(state);

    return {
        usage,
        max,
    };
})(EfficientHouseholdsUsage);
