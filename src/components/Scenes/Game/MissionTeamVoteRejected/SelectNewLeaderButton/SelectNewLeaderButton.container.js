import { connect } from 'react-redux';

import { selectNewLeaderAction as onPress } from 'store/game/game.actions';

import SelectNewLeaderButton from './SelectNewLeaderButton.component';

export default connect(null, {
    onPress,
})(SelectNewLeaderButton);
