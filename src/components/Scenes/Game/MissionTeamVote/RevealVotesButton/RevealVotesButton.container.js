import { connect } from 'react-redux';

import { missionTeamVotingCompleteSelector } from 'selectors';

import { revealProposedMissionTeamVoteAction as onPress } from 'store/game/game.actions';

import RevealVotesButton from './RevealVotesButton.component';

export default connect(
    (state) => {
        const disabled = !missionTeamVotingCompleteSelector(state);

        return {
            disabled,
        };
    },
    {
        onPress,
    },
)(RevealVotesButton);
