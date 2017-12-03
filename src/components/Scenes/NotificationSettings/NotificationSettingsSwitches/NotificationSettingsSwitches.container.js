import {
    connect,
} from 'react-redux';

import {
    getSyncNotificationsAction as componentDidMount,
    getResetNotificationsAction as componentWillUnmount,
    getToggleNotificationSettingAction as onValueChange,
} from '/store/notificationSettings/notificationSettings.actions';

import {
    notificationSettingsNotificationsSelector,
} from '/selectors';

import NotificationSettingsSwitches from './NotificationSettingsSwitches.component';

export default connect(state => {
    const notifications = notificationSettingsNotificationsSelector(state);

    return {
        notifications,
    };
}, {
    componentDidMount,
    componentWillUnmount,
    onValueChange,
})(NotificationSettingsSwitches);
