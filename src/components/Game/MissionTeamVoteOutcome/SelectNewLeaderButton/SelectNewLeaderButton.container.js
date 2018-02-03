import { connect } from 'react-redux';

import { selectNewLeaderAction as onPress } from 'store/missionTeamVoteOutcome/missionTeamVoteOutcome.actions';

import { missionTeamVoteOutcomeIsSelectingNewLeaderSelector } from 'selectors';

import SelectNewLeaderButton from './SelectNewLeaderButton.component';

export default connect(
    (st) => {
        const isLoading = missionTeamVoteOutcomeIsSelectingNewLeaderSelector(
            st,
        );

        return {
            isLoading,
        };
    },
    {
        onPress,
    },
)(SelectNewLeaderButton);
