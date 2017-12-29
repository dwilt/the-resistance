import { connect } from 'react-redux';

import { isOnMissionTeam, submittedMissionPassVote } from 'selectors';

import ConductMission from './ConductMission.component';

export default connect((state) => {
    const submittedVote = submittedMissionPassVote(state);
    const canVote = isOnMissionTeam(state);

    return {
        canVote,
        submittedVote,
    };
})(ConductMission);