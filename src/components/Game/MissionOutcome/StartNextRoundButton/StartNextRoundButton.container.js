import { connect } from 'react-redux';

import { missionOutcomeIsStartingNextRoundSelector } from 'selectors';

import { startNextRoundAction as onPress } from 'store/missionOutcome/missionOutcome.actions';

import StartNextRoundButton from './StartNextRoundButton.component';

export default connect(
    (st) => {
        const isLoading = missionOutcomeIsStartingNextRoundSelector(st);

        return {
            isLoading,
        };
    },
    {
        onPress,
    },
)(StartNextRoundButton);
