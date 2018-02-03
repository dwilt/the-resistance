import { connect } from 'react-redux';

import { missionTeamVoteCastSelector } from 'selectors';

import { submitProposedMissionTeamApprovalAction as onPress } from 'store/missionTeamVote/missionTeamVote.actions';

import SubmitVoteButton from './SubmitVoteButton.component';

export default connect(
    (state) => {
        const disabled = !missionTeamVoteCastSelector(state);

        return {
            disabled,
        };
    },
    {
        onPress,
    },
)(SubmitVoteButton);
