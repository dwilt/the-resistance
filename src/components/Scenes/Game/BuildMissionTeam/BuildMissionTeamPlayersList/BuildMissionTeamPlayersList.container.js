import { connect } from 'react-redux';

import {
    playersSelector,
    isLeaderSelector,
    proposedMissionTeamSelector,
    propedMissionTeamIsFilledSelector,
} from 'selectors';

import { toggleMissionTeamMemberAction as onPlayerTap } from 'store/game/game.actions';

import BuildMissionTeamPlayersList from './BuildMissionTeamPlayersList.component';

export default connect(
    (st) => {
        const players = playersSelector(st);
        const isLeader = isLeaderSelector(st);
        const proposedTeam = proposedMissionTeamSelector(st);
        const isFilled = propedMissionTeamIsFilledSelector(st);

        return {
            players,
            isLeader,
            proposedTeam,
            isFilled,
        };
    },
    {
        onPlayerTap,
    },
)(BuildMissionTeamPlayersList);
