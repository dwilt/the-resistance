import React, {
    PureComponent,
} from 'react';

import {
    EnableNotificationsButton,
    EnableNotificationsSkipButton,
    Scene,
    Text,
} from '/components';

import {
    getLocalizedString,
} from '/services/locale.service';

import styles from './EnableNotifications.styles';

export default class EnableNotifications extends PureComponent {

    render() {
        return (
            <Scene
                title={getLocalizedString(`enableNotifications.title`)}
                compact={true}
                whiteBg={true}
            >
                <Text style={styles.instructions}>{getLocalizedString(`enableNotifications.instructions`)}</Text>
                <EnableNotificationsButton/>
                <EnableNotificationsSkipButton/>
            </Scene>
        );
    }
}
