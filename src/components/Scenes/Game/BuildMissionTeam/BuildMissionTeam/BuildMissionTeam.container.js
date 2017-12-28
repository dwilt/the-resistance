import { connect } from 'react-redux';

import {
    isLeaderSelector,
    roundCountSelector,
    playersSelector,
    allPlayersConfirmedIdentitySelector,
} from 'selectors';

import BuildMissionTeam from './BuildMissionTeam.component';

export default connect((state) => {
    const isLeader = isLeaderSelector(state);
    const players = playersSelector(state);
    const roundCount = roundCountSelector(state);
    const allPlayersConfirmedIdentity = allPlayersConfirmedIdentitySelector(
        state,
    );

    return {
        isLeader,
        players,
        roundCount,
        allPlayersConfirmedIdentity,
    };
})(BuildMissionTeam);
