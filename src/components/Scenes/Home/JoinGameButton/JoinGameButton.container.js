import { connect } from 'react-redux';

import { joinGameAction as onPress } from 'store/game/game.actions';

import JoinGameButton from './JoinGameButton.component';

export default connect(null, {
    onPress,
})(JoinGameButton);
