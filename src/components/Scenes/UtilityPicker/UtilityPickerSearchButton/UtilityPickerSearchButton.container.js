import {
    connect,
} from 'react-redux';

import {
    getSearchAction as onPress,
} from '/store/utilityPicker/utilityPicker.actions';

import {
    utilityPickerFormIsValidSelector,
    utilityPickerIsSearchingSelector,
} from '/selectors';

import UtilitySearchButton from './UtilityPickerSearchButton.component';

export default connect(st => {
    const formIsValid = utilityPickerFormIsValidSelector(st);
    const isSearching = utilityPickerIsSearchingSelector(st);

    return {
        formIsValid,
        isSearching,
    };
}, {
    onPress,
})(UtilitySearchButton);
