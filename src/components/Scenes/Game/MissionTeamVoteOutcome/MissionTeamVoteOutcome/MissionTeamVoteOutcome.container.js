import { connect } from 'react-redux';

import {
    missionTeamVotesApprovedSelector,
    missionTeamVotesRejectedSelector,
    missionTeamApprovedSelector,
} from 'selectors';

import MissionTeamVoteOutcome from './MissionTeamVoteOutcome.component';

export default connect((state) => {
    const totalApprovedVotes = missionTeamVotesApprovedSelector(state);
    const totalRejectedVotes = missionTeamVotesRejectedSelector(state);
    const approved = missionTeamApprovedSelector(state);

    return {
        totalApprovedVotes,
        totalRejectedVotes,
        approved,
    };
})(MissionTeamVoteOutcome);
