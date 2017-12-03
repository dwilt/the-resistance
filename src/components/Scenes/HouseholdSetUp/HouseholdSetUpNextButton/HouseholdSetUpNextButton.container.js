import {
    connect,
} from 'react-redux';

import {
    getNextStepAction as onPress,
} from '/store/householdSetUp/householdSetUp.actions';

import HouseholdAttributesNextButton from './HouseholdSetUpNextButton.component';

export default connect(null, {
    onPress,
})(HouseholdAttributesNextButton);
