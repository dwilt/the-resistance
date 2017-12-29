import {
    connect,
} from 'react-redux';

import {
    conductMissionVoteCastSelector
} from 'selectors';

import {
    submitMissionPass as onPress
} from 'store/game/game.actions';

import SubmitMissionVoteButton from './SubmitMissionVoteButton.component';

export default connect(state => {
    const disabled = !conductMissionVoteCastSelector(state);

    return {
        disabled
    };
}, {
    onPress
})(SubmitMissionVoteButton);
