import {
    connect,
} from 'react-redux';

import {
    getResetAction as reset,
} from '/store/utilityPicker/utilityPicker.actions';

import UtilityPicker from './UtilityPicker.component';

export default connect(null, {
    reset,
})(UtilityPicker);
