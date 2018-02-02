import { connect } from 'react-redux';

import { retractProposedMissionTeamApprovalAction as onPress } from 'store/game/game.actions';

import ChangeVoteButton from './ChangeVoteButton.component';

export default connect(null, {
    onPress,
})(ChangeVoteButton);
