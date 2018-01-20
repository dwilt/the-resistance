import { connect } from 'react-redux';

import { missionTeamVoteOutcomeIsConductingSelector } from 'selectors';

import { conductMissionAction as onPress } from 'store/game/game.actions';

import ConductMissionButton from './ConductMissionButton.component';

export default connect(
    (state) => {
        const isLoading = missionTeamVoteOutcomeIsConductingSelector(state);

        return {
            isLoading,
        };
    },
    {
        onPress,
    },
)(ConductMissionButton);
