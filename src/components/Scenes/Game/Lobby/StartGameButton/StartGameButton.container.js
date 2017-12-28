import { connect } from 'react-redux';

import { startGameAction as onPress } from 'store/game/game.actions';

import StartGameButton from './StartGameButton.component';

export default connect(null, {
    onPress,
})(StartGameButton);
