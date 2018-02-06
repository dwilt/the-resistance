import React, { PureComponent } from 'react';

import { View } from 'react-native';

import {
    LoginEmail,
    LoginPassword,
    LoginName,
    Scene,
    LoginTitle,
    LoginError,
    LoginRegisterButton,
    LoginSubmitButton,
    LoginForgotPasswordButton,
} from 'components';

import styles from './Login.styles';

class Login extends PureComponent {
    render() {
        return (
            <Scene showMenuToggle={false}>
                <View style={styles.container}>
                    <LoginTitle />
                    <LoginError />
                    <LoginEmail />
                    <LoginPassword />
                    <LoginName />
                    <LoginRegisterButton />
                    <LoginSubmitButton />
                    <LoginForgotPasswordButton />
                </View>
            </Scene>
        );
    }
}

Login.key = `LOGIN_KEY`;

export default Login;
