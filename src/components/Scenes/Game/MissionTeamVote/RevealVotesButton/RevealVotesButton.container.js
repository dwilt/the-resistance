import { connect } from 'react-redux';

import { missionTeamVotingCompleteSelector, missionTeamVoteIsRevealingSelector } from 'selectors';

import { revealProposedMissionTeamVoteAction as onPress } from 'store/game/game.actions';

import RevealVotesButton from './RevealVotesButton.component';

export default connect(
    (state) => {
        const disabled = !missionTeamVotingCompleteSelector(state);
        const isLoading = missionTeamVoteIsRevealingSelector(state);

        return {
            disabled,
            isLoading
        };
    },
    {
        onPress,
    },
)(RevealVotesButton);
