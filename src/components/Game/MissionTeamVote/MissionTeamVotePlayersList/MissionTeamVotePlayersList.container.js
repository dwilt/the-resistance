import { connect } from 'react-redux';

import { proposedMissionTeamNamesSelector } from 'selectors';

import MissionTeamVotePlayersList from './MissionTeamVotePlayersList.component';

export default connect((state) => {
    const players = proposedMissionTeamNamesSelector(state);

    return {
        players,
    };
})(MissionTeamVotePlayersList);
