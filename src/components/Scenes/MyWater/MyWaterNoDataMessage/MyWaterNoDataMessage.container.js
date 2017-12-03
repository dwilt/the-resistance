import {
    connect,
} from 'react-redux';

import {
    myWaterChartStateSelector,
} from '/selectors';

import MyWaterNoDataMessage from './MyWaterNoDataMessage.component';

export default connect(st => {
    const state = myWaterChartStateSelector(st);

    return {
        state,
    };
})(MyWaterNoDataMessage);
