import {
    connect,
} from 'react-redux';

import {
    myWaterChartStateSelector,
} from '/selectors';

import MyWaterActivityIndicator from './MyWaterActivityIndicator.component';

export default connect(st => {
    const state = myWaterChartStateSelector(st);

    return {
        state,
    };
})(MyWaterActivityIndicator);
