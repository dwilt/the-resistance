import {
    connect,
} from 'react-redux';

import {
    utilityPickerErrorSelector,
} from '/selectors';

import UtilityPickerError from './UtilityPickerError.component';

export default connect(st => {
    const error = utilityPickerErrorSelector(st);

    return {
        error,
    };
})(UtilityPickerError);
