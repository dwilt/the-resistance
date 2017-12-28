import { connect } from 'react-redux';

import { propedMissionTeamIsFilledSelector } from 'selectors';

import { confirmMissionTeamAction as onPress } from 'store/game/game.actions';

import ConfirmMissionTeamButton from './ConfirmMissionTeamButton.component';

export default connect(
    (state) => {
        const disabled = !propedMissionTeamIsFilledSelector(state);

        return {
            disabled,
        };
    },
    {
        onPress,
    },
)(ConfirmMissionTeamButton);
