import { connect } from 'react-redux';

import { getQuitGameAction as onPress } from 'store/gameMenu/gameMenu.actions';

import QuitGameButton from './QuitGameButton.component';

export default connect(null, {
    onPress,
})(QuitGameButton);
