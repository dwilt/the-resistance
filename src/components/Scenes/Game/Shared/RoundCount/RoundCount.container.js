import { connect } from 'react-redux';

import {
    roundCountSelector,
    failedMissionsSelector,
    passedMissionsSelector,
} from 'selectors';

import RoundCount from './RoundCount.component';

export default connect((st) => {
    const roundCount = roundCountSelector(st);
    const passedMissions = passedMissionsSelector(st);
    const failedMissions = failedMissionsSelector(st);

    return {
        roundCount,
        passedMissions,
        failedMissions,
    };
})(RoundCount);
