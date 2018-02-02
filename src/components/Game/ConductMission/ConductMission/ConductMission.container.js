import { connect } from 'react-redux';

import {
    isOnMissionTeamSelector,
    submittedMissionPassVoteSelector,
} from 'selectors';

import ConductMission from './ConductMission.component';

export default connect((state) => {
    const submittedVote = submittedMissionPassVoteSelector(state);
    const canVote = isOnMissionTeamSelector(state);

    return {
        canVote,
        submittedVote,
    };
})(ConductMission);
