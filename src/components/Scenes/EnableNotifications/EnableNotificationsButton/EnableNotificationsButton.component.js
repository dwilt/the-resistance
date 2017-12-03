import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    getLocalizedString,
} from '/services/locale.service';

import {
    ActionButton,
} from '/components';

export default class EnableNotificationsButton extends PureComponent {
    static defaultProps = {
        onPress: PropTypes.func.isRequired,
    };

    render() {
        return (
            <ActionButton
                {...this.props}
            >
                {getLocalizedString(`enableNotifications.enable`)}
            </ActionButton>
        );
    }
}
