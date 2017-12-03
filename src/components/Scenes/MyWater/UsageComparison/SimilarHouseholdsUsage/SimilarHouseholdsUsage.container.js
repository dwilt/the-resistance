import {
    connect,
} from 'react-redux';

import {
    myWaterSimilarHouseholdsSelector,
    myWaterMaxUsageSelectorSelector,
} from '/selectors';

import SimilarHouseholdsUsage from './SimilarHouseholdsUsage.component';

export default connect(state => {
    const usage = myWaterSimilarHouseholdsSelector(state);
    const max = myWaterMaxUsageSelectorSelector(state);

    return {
        usage,
        max,
    };
})(SimilarHouseholdsUsage);
