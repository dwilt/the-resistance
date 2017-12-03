import React, {
    PureComponent,
} from 'react';

import {
    Scene,
    IconAndText,
    NotificationSettingsSwitches,
} from '/components';

import {
   getLocalizedString,
} from '/services/locale.service';

export default class NotificationSettings extends PureComponent {
    render() {
        return (
            <Scene
                title={getLocalizedString(`notificationSettings.title`)}
                isModal={true}
            >
                <IconAndText
                    icon={`alarm-ringing`}
                    text={getLocalizedString(`notificationSettings.subtitle`)}
                />
                <NotificationSettingsSwitches/>
            </Scene>
        );
    }
}
