import {
    connect,
} from 'react-redux';

import {
    getSkipEnableNotificationsAction as onPress,
} from '/store/enableNotifications/enableNotifications.actions';

import EnableNotificationsSkipButton from './EnableNotificationsSkipButton.component';

export default connect(null, {
    onPress,
})(EnableNotificationsSkipButton);
