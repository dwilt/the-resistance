import { connect } from 'react-redux';

import { startNextRoundAction as onPress } from 'store/game/game.actions';

import StartNextRoundButton from './StartNextRoundButton.component';

export default connect(null, {
    onPress,
})(StartNextRoundButton);
