import { connect } from 'react-redux';

import {
    enoughPlayersInGameSelector
} from 'selectors';

import { startGameAction as onPress } from 'store/game/game.actions';

import StartGameButton from './StartGameButton.component';

export default connect(state => {
    const disabled = !enoughPlayersInGameSelector(state);

    return {
        disabled
    }
}, {
    onPress,
})(StartGameButton);
