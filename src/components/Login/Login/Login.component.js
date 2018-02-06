import React, { PureComponent } from "react";

import { View } from "react-native";

import {
    LoginEmail,
    LoginPassword,
    LoginName,
    Scene,
    LoginTitle,
    LoginError,
    LoginRegisterButton,
    LoginSubmitButton,
} from "components";

import styles from "./Login.styles";

class Login extends PureComponent {
    render() {
        return (
            <Scene>
                <View style={styles.container}>
                    <LoginTitle />
                    <LoginError />
                    <LoginEmail />
                    <LoginPassword />
                    <LoginName />
                    <LoginRegisterButton />
                    <LoginSubmitButton />
                </View>
            </Scene>
        );
    }
}

Login.key = `LOGIN_KEY`;

export default Login;
