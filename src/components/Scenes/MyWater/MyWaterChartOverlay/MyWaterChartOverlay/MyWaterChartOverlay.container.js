import {
    connect,
} from 'react-redux';

import {
    myWaterChartOverlayIsVisibleSelector,
} from '/selectors';

import {
    hideWaterChartOverlayAction as close,
} from '/store/myWater/myWater.actions';

import MyWaterChartOverlay from './MyWaterChartOverlay.component';

export default connect(state => {
    const isVisible = myWaterChartOverlayIsVisibleSelector(state);

    return {
        isVisible,
    };
}, {
    close,
})(MyWaterChartOverlay);
