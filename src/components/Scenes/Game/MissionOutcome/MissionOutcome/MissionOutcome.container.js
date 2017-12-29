import { connect } from 'react-redux';

import { missionPassedSelector, isHostSelector } from 'selectors';

import MissionOutcome from './MissionOutcome.component';

export default connect((state) => {
    const passed = missionPassedSelector(state);
    const isHost = isHostSelector(state);

    return {
        passed,
        isHost,
    };
})(MissionOutcome);
