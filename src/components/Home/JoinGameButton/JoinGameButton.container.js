import { connect } from 'react-redux';

import { homeIsJoiningGameSelector } from 'selectors';

import { joinGameAction as onPress } from 'store/home/home.actions';

import JoinGameButton from './JoinGameButton.component';

export default connect(
    (state) => {
        const isLoading = homeIsJoiningGameSelector(state);

        return {
            isLoading,
        };
    },
    {
        onPress,
    },
)(JoinGameButton);
