import {
    connect,
} from 'react-redux';

import {
    getCompleteSetUpAction as onPress,
} from '/store/completedSetUp/completedSetUp.actions';

import CompleteSetupButton from './CompleteSetUpButton.component';

export default connect(null, {
    onPress,
})(CompleteSetupButton);
