import React, {
    PureComponent,
} from 'react';

import {
    ForgotPasswordError,
    ForgotPasswordInput,
    ForgotPasswordResetButton,
    Scene,
    Text,
} from '/components';

import {
    getLocalizedString,
} from '/services/locale.service';

import styles from './ForgotPassword.styles';

export default class ForgotPassword extends PureComponent {
    render() {
        return (
            <Scene
                title={getLocalizedString(`forgotPassword.title`)}
                whiteBg={true}
                compact={true}
            >
                <Text style={styles.instructions}>{getLocalizedString(`forgotPassword.instructions`)}</Text>
                <ForgotPasswordError/>
                <ForgotPasswordInput/>
                <ForgotPasswordResetButton/>
            </Scene>
        );
    }
}
