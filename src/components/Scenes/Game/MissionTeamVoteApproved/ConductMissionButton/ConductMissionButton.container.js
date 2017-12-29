import { connect } from 'react-redux';

import { missionTeamVoteApprovedIsConductingSelector } from 'selectors';

import { conductMissionAction as onPress } from 'store/game/game.actions';

import ConductMissionButton from './ConductMissionButton.component';

export default connect(
    (state) => {
        const isLoading = missionTeamVoteApprovedIsConductingSelector(state);

        return {
            isLoading,
        };
    },
    {
        onPress,
    },
)(ConductMissionButton);
