import { connect } from 'react-redux';

import { missionTeamSubmittedVoteSelector, isHostSelector } from 'selectors';

import MissionTeamVote from './MissionTeamVote.component';

export default connect(
    (state) => {
        const submittedVote = missionTeamSubmittedVoteSelector(state);
        const isHost = isHostSelector(state);

        return {
            submittedVote,
            isHost,
        };
    }
)(MissionTeamVote);
