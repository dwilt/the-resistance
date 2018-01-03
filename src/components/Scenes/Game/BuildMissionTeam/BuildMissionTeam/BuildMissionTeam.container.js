import { connect } from 'react-redux';

import {
    isLeaderSelector,
    roundCountSelector,
    playersSelector,
    playerConfirmedIdentitySelector,
    leaderNameSelector,
} from 'selectors';

import BuildMissionTeam from './BuildMissionTeam.component';

export default connect((state) => {
    const isLeader = isLeaderSelector(state);
    const players = playersSelector(state);
    const roundCount = roundCountSelector(state);
    const playerConfirmedIdentity = playerConfirmedIdentitySelector(state);
    const leader = leaderNameSelector(state);

    return {
        isLeader,
        players,
        roundCount,
        playerConfirmedIdentity,
        leader,
    };
})(BuildMissionTeam);
