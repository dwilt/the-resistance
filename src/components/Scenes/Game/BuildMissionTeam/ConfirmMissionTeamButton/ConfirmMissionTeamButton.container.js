import { connect } from 'react-redux';

import { proposedMissionTeamIsFilledSelector, buildMissionTeamIsConfirmingSelector } from 'selectors';

import { confirmMissionTeamAction as onPress } from 'store/game/game.actions';

import ConfirmMissionTeamButton from './ConfirmMissionTeamButton.component';

export default connect(
    (state) => {
        const disabled = !proposedMissionTeamIsFilledSelector(state);
        const isLoading = buildMissionTeamIsConfirmingSelector(state);

        return {
            disabled,
            isLoading
        };
    },
    {
        onPress,
    },
)(ConfirmMissionTeamButton);
