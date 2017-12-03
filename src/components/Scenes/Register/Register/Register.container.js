import {
    connect,
} from 'react-redux';

import {
    utilityPickerSelectedUtilityName,
} from '/selectors';

import RegisterScene from './Register.component';

export default connect(state => {
    const utilityName = utilityPickerSelectedUtilityName(state);

    return {
        utilityName,
    };
})(RegisterScene);
