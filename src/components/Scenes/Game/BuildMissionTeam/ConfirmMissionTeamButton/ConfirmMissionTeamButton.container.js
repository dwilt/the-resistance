import { connect } from 'react-redux';

import { proposedMissionTeamIsFilledSelector } from 'selectors';

import { confirmMissionTeamAction as onPress } from 'store/game/game.actions';

import ConfirmMissionTeamButton from './ConfirmMissionTeamButton.component';

export default connect(
    (state) => {
        const disabled = !proposedMissionTeamIsFilledSelector(state);

        return {
            disabled,
        };
    },
    {
        onPress,
    },
)(ConfirmMissionTeamButton);
