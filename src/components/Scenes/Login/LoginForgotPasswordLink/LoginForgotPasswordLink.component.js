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

import styles from './LoginForgotPasswordLink.styles';

export default class LoginForgotPasswordLink extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
    };

    render() {
        return (
            <TextButton
                {...this.props}
                style={styles.container}
                textStyles={styles.text}
            >
                {getLocalizedString(`login.forgotPassword`)}
            </TextButton>
        );
    }
}
