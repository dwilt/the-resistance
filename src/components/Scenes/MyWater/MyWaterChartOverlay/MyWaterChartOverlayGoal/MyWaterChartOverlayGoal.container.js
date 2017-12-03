import {
    connect,
} from 'react-redux';

import {
    myWaterChartOverlayGoalSelector,
    myWaterChartOverlayUsageSelector,
} from '/selectors';

import MyWaterChartOverlayGoal from './MyWaterChartOverlayGoal.component';

export default connect(state => {
    const goal = myWaterChartOverlayGoalSelector(state);
    const usage = myWaterChartOverlayUsageSelector(state);

    return {
        goal,
        usage,
    };
})(MyWaterChartOverlayGoal);
