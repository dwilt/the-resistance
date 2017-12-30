import { connect } from 'react-redux';

import {
    isLeaderSelector,
    roundCountSelector,
    playersSelector,
    playerConfirmedIdentitySelector,
} from 'selectors';

import BuildMissionTeam from './BuildMissionTeam.component';

export default connect((state) => {
    const isLeader = isLeaderSelector(state);
    const players = playersSelector(state);
    const roundCount = roundCountSelector(state);
    const playerConfirmedIdentity = playerConfirmedIdentitySelector(
        state,
    );

    return {
        isLeader,
        players,
        roundCount,
        playerConfirmedIdentity,
    };
})(BuildMissionTeam);
