import React, {
    PureComponent,
} from 'react';

import {
    KeyboardAvoidingView,
    Image,
    View,
} from 'react-native';

import {
    DismissKeyboardView,
    LoginEmail,
    LoginError,
    LoginForgotPasswordLink,
    LoginPassword,
    LoginButton,
    LoginRegisterButton,
    Scene,
} from '/components';

const logo = require(`../../../../assets/images/dropcountr-logo.png`);

import styles from './Login.styles';

export default class Login extends PureComponent {
    render() {
        return (
            <Scene
                title={`Login`}
                compact={true}
                whiteBg={true}
                hideHeader={true}
                scrollContent={false}
                style={styles.container}
            >
                <DismissKeyboardView>
                    <View style={styles.wrapper}>

                        <KeyboardAvoidingView
                            style={styles.innerContainer}
                            behavior={`position`}
                        >

                            <View style={styles.logoContainer}>
                                <Image
                                    source={logo}
                                    style={styles.logo}
                                />
                            </View>
                            <LoginError/>
                            <LoginEmail/>
                            <LoginPassword/>
                            <LoginForgotPasswordLink/>
                            <LoginButton/>
                            <LoginRegisterButton/>
                        </KeyboardAvoidingView>
                    </View>
                </DismissKeyboardView>
            </Scene>
        );
    }
}
