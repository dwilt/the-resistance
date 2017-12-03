import {
    connect,
} from 'react-redux';

import {
    utilityPickerUtilitiesSelector,
    utilityPickerShowResultsSelector,
} from '/selectors';

import {
    getSelectUtilityIdAction as onPress,
} from '/store/utilityPicker/utilityPicker.actions';

import UtilityPickerList from './UtilityPickerList.component';

export default connect(st => {
    const utilities = utilityPickerUtilitiesSelector(st);
    const showResults = utilityPickerShowResultsSelector(st);

    return {
        utilities,
        showResults,
    };
}, {
    onPress,
})(UtilityPickerList);
