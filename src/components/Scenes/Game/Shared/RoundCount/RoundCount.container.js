import { connect } from 'react-redux';

import {
    roundCountSelector,
    failedMissionsSelector,
    passedMissionsSelector,
    gameStateSelector,
} from 'selectors';

import RoundCount from './RoundCount.component';

export default connect((st) => {
    const roundCount = roundCountSelector(st);
    const passedMissions = passedMissionsSelector(st);
    const failedMissions = failedMissionsSelector(st);
    const gameState = gameStateSelector(st);

    return {
        roundCount,
        passedMissions,
        failedMissions,
        gameState,
    };
})(RoundCount);
