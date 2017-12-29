import {
    connect,
} from 'react-redux';

import {
    passMissionAction as onPress
} from 'store/conductMission/conductMission.actions';

import {
   passesMissionSelector
} from 'selectors';

import PassMissionButton from './PassMissionButton.component';

export default connect((state) => {
    const selected = passesMissionSelector(state);

    return {
        selected,
    };
}, {
    onPress
})(PassMissionButton);
