import {
    connect,
} from 'react-redux';

import {
    getUtilityNotFoundAction as onPress,
} from '/store/utilityPicker/utilityPicker.actions';

import {
    utilityPickerShowResultsSelector,
} from '/selectors';

import UtilityPickerUtilityNotFoundButton from './UtilityPickerUtilityNotFoundButton.component';

export default connect(st => {
    const showResults = utilityPickerShowResultsSelector(st);

    return {
        showResults,
    };
}, {
    onPress,
})(UtilityPickerUtilityNotFoundButton);
