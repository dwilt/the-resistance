import { connect } from 'react-redux';

import { retractProposedMissionTeamApprovalAction as onPress } from 'store/missionTeamVote/missionTeamVote.actions';

import ChangeVoteButton from './ChangeVoteButton.component';

export default connect(null, {
    onPress,
})(ChangeVoteButton);
