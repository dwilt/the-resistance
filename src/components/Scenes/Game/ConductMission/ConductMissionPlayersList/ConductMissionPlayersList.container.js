import { connect } from 'react-redux';

import { proposedMissionTeamNamesSelector } from 'selectors';

import ConductMissionPlayersList from './ConductMissionPlayersList.component';

export default connect((state) => {
    const players = proposedMissionTeamNamesSelector(state);

    return {
        players,
    };
})(ConductMissionPlayersList);