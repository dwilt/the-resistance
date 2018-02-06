import { connect } from "react-redux";

import {
    proposedMissionTeamIsFilledSelector,
    allPlayersConfirmedIdentitySelector,
    buildMissionTeamIsConfirmingSelector,
} from "selectors";

import { confirmMissionTeamAction as onPress } from "store/buildMissionTeam/buildMissionTeam.actions";

import ConfirmMissionTeamButton from "./ConfirmMissionTeamButton.component";

export default connect(
    state => {
        const disabled =
            !proposedMissionTeamIsFilledSelector(state) ||
            !allPlayersConfirmedIdentitySelector(state);
        const isLoading = buildMissionTeamIsConfirmingSelector(state);

        return {
            disabled,
            isLoading,
        };
    },
    {
        onPress,
    }
)(ConfirmMissionTeamButton);
