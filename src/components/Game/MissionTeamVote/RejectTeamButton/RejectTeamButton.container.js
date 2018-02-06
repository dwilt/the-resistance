import { connect } from 'react-redux';

import { rejectsProposedMissionTeamSelector } from 'selectors';

import { rejectProposedMissionTeamAction as onPress } from 'store/missionTeamVote/missionTeamVote.actions';

import RejectTeamButton from './RejectTeamButton.component';

export default connect(
    (state) => {
        const selected = rejectsProposedMissionTeamSelector(state);

        return {
            selected,
        };
    },
    {
        onPress,
    },
)(RejectTeamButton);
