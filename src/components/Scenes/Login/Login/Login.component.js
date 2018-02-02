import React, { Component } from 'react';

import { KeyboardAvoidingView, View } from 'react-native';

import {
    DismissKeyboardView,
    ErrorMessage,
    TextInput,
    ActionButton,
    TextButton,
    LoginEmail,
    LoginPassword,
    LoginName,
} from 'components';

import { firebase, db } from 'services';

import styles from './Login.styles';

class Login extends Component {
    state = {
        showRegister: true,
        isRegistering: false,
        error: null,
    };
    setEmail = (email) =>
        this.setState({
            email,
        });

    setPassword = (password) =>
        this.setState({
            password,
        });

    submitForm = async () => {
        const { email, password, showRegister, name } = this.state;

        try {
            this.setState({
                error: null,
                isRegistering: true,
            });

            if (showRegister) {

            } else {

            }
        } catch ({ message }) {
            this.setState({
                error: message,
            });
        } finally {
            this.setState({
                isRegistering: false,
            });
        }
    };

    toggleForm = () => {
        this.setState((state) => ({
            showRegister: !state.showRegister,
        }));
    };

    render() {
        const {
            isRegistering,
            showRegister,
            error,
        } = this.state;

        const errorEl = error && <ErrorMessage error={error} />;

        return (
            <DismissKeyboardView>
                <View style={styles.container}>
                    <KeyboardAvoidingView
                        style={styles.innerContainer}
                        behavior={`position`}
                    >
                        {errorEl}
                        <LoginEmail/>
                        <LoginPassword/>
                        <LoginName/>
                        <ActionButton
                            onPress={this.submitForm}
                            isLoading={isRegistering}
                        >
                            {showRegister ? `Register` : `Login`}
                        </ActionButton>
                        <TextButton onPress={this.toggleForm}>
                            {showRegister ? `or Login` : `Back to Register`}
                        </TextButton>
                    </KeyboardAvoidingView>
                </View>
            </DismissKeyboardView>
        );
    }
}

Login.key = `LOGIN_KEY`;

export default Login;
