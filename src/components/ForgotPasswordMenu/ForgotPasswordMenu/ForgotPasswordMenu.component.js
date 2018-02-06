import React, { PureComponent } from 'react';

import { View } from 'react-native';

import {
    Text,
    Scene,
    ForgotPasswordMenuToggle,
    LoginEmail,
    ForgotPasswordSubmitButton,
    ForgotPasswordError,
} from 'components';

import styles from './ForgotPasswordMenu.styles';

class ForgotPasswordMenu extends PureComponent {
    render() {
        return (
            <Scene menuToggle={<ForgotPasswordMenuToggle />}>
                <View style={styles.container}>
                    <Text style={styles.title}>Password Recovery</Text>
                    <Text style={styles.subtitle}>
                        Enter in your email below so we can send you a link to
                        reset your password.
                    </Text>
                    <ForgotPasswordError />
                    <View>
                        <LoginEmail />
                    </View>
                    <ForgotPasswordSubmitButton />
                </View>
            </Scene>
        );
    }
}

ForgotPasswordMenu.key = `ForgotPasswordMenu`;

export default ForgotPasswordMenu;
