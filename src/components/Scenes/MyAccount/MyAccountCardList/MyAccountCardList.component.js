import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    CardList,
} from '/components';

import {
    getLocalizedString,
} from '/services/locale.service';

export default class MyAccountCardList extends PureComponent {
    static propTypes = {
        profileOnPress: PropTypes.func.isRequired,
        notificationSettingsOnPress: PropTypes.func.isRequired,
        supportOnPress: PropTypes.func.isRequired,
    };

    render() {
        const { profileOnPress, notificationSettingsOnPress, supportOnPress } = this.props;

        return (
            <CardList
                stretch={false}
                cards={[
                    {
                        id: `profile`,
                        onPress: profileOnPress,
                        icon: `home4`,
                        title: getLocalizedString(`myAccount.profile.title`),
                        subtitle: getLocalizedString(`myAccount.profile.subtitle`),
                    },
                    {
                        id: `notifications`,
                        onPress: notificationSettingsOnPress,
                        icon: `alarm-ringing`,
                        title: getLocalizedString(`myAccount.notifications.title`),
                        subtitle: getLocalizedString(`myAccount.notifications.subtitle`),
                    },
                    {
                        id: `support`,
                        onPress: supportOnPress,
                        icon: `bubble-question`,
                        title: getLocalizedString(`myAccount.support.title`),
                        subtitle: getLocalizedString(`myAccount.support.subtitle`),
                    },
                ]}
            />
        );
    }
}
