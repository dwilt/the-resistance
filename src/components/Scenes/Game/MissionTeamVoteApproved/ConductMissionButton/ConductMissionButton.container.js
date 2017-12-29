import { connect } from 'react-redux';

import { conductMissionAction as onPress } from 'store/game/game.actions';

import ConductMissionButton from './ConductMissionButton.component';

export default connect(null, {
    onPress,
})(ConductMissionButton);
