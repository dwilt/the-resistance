import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    getLocalizedString,
} from '/services/locale.service';

import {
    TextButton,
} from '/components';

export default class EnableNotificationsSkipButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
    };

    render() {
        return (
            <TextButton
                {...this.props}
            >
                {getLocalizedString(`enableNotifications.skip`)}
            </TextButton>
        );
    }
}
