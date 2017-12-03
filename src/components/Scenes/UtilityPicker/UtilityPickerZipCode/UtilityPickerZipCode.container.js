import {
    connect,
} from 'react-redux';

import {
    getSearchAction as onSubmitEditing,
    getSetZipCodeAction as onChangeText,
} from '/store/utilityPicker/utilityPicker.actions';

import {
    utilityPickerZipCodeSelector,
} from '/selectors';

import ZipCodeInput from './UtilityPickerZipCode.component';

export default connect(st => {
    const value = utilityPickerZipCodeSelector(st);

    return {
        value,
    };
}, {
    onChangeText,
    onSubmitEditing,
})(ZipCodeInput);
