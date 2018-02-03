import { connect } from 'react-redux';

import {
    playersSelector,
    isLeaderSelector,
    proposedMissionTeamSelector,
    proposedMissionTeamIsFilledSelector,
} from 'selectors';

import { toggleMissionTeamMemberAction as onPlayerTap } from 'store/buildMissionTeam/buildMissionTeam.actions';

import BuildMissionTeamPlayersList from './BuildMissionTeamPlayersList.component';

export default connect(
    (st) => {
        const players = playersSelector(st);
        const isLeader = isLeaderSelector(st);
        const proposedTeam = proposedMissionTeamSelector(st);
        const isFilled = proposedMissionTeamIsFilledSelector(st);

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
