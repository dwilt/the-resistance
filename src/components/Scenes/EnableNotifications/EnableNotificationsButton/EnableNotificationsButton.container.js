import {
    connect,
} from 'react-redux';

import {
    getRequestNotificationsPermissionAction as onPress,
} from '/store/enableNotifications/enableNotifications.actions';

import EnableNotificationsButton from './EnableNotificationsButton.component';

export default connect(null, {
    onPress,
})(EnableNotificationsButton);
