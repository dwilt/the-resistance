import { connect } from 'react-redux';

import { homeIsCreatingGameSelector } from 'selectors';

import { createNewGameAction as onPress } from 'store/game/game.actions';

import CreateGameButton from './CreateGameButton.component';

export default connect(
    (state) => {
        const isLoading = homeIsCreatingGameSelector(state);

        return {
            isLoading,
        };
    },
    {
        onPress,
    },
)(CreateGameButton);
