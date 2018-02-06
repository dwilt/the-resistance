import { connect } from "react-redux";

import { approvesProposedMissionTeamSelector } from "selectors";

import { approveProposedMissionTeamAction as onPress } from "store/missionTeamVote/missionTeamVote.actions";

import ApproveTeamButton from "./ApproveTeamButton.component";

export default connect(
    state => {
        const selected = approvesProposedMissionTeamSelector(state);

        return {
            selected,
        };
    },
    {
        onPress,
    }
)(ApproveTeamButton);
