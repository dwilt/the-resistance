import {
    connect,
} from 'react-redux';

import {
    myWaterChartStateSelector,
} from '/selectors';

import UsageComparison from './UsageComparison.component';

export default connect(st => {
    const state = myWaterChartStateSelector(st);

    return {
        state,
    };
})(UsageComparison);
