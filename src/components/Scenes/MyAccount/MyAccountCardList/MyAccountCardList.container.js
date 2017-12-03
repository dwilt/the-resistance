import {
    connect,
} from 'react-redux';

import {
    goToNotificationSettings as notificationSettingsOnPress,
    goToProfile as profileOnPress,
    goToSupport as supportOnPress,
} from '/store/routes/routes.actions';

import MyAccountCardList from './MyAccountCardList.component';

export default connect(null, {
    notificationSettingsOnPress,
    profileOnPress,
    supportOnPress,
})(MyAccountCardList);
