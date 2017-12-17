import React, { Component } from "react";

import { KeyboardAvoidingView, View } from "react-native";

import {
    DismissKeyboardView,
    ErrorMessage,
    TextInput,
    ActionButton,
    TextButton,
    Text
} from "/components";

import { firebase, db } from "/services";

import styles from "./Login.styles";

class Login extends Component {
    state = {
        password: ``,
        email: ``,
        name: ``,
        showRegister: true,
        isRegistering: false,
        error: null
    };

    setName = (name) =>
        this.setState({
            name
        });

    setEmail = (email) =>
        this.setState({
            email
        });

    setPassword = (password) =>
        this.setState({
            password
        });

    submitForm = async () => {
        const { email, password, showRegister, name } = this.state;

        try {
            this.setState({
                error: null,
                isRegistering: true
            });

            if (showRegister) {
                await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password);

                const userId = firebase.auth().currentUser.uid;

                await db
                    .collection(`users`)
                    .doc(userId)
                    .set({
                        name
                    });
            } else {
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password);
            }
        } catch ({ message }) {
            this.setState({
                error: message
            });
        } finally {
            this.setState({
                isRegistering: false
            });
        }
    };

    toggleForm = () => {
        this.setState((state) => ({
            showRegister: !state.showRegister
        }));
    };

    render() {
        const {
            password,
            email,
            isRegistering,
            showRegister,
            error,
            name
        } = this.state;
        const errorEl = error && <ErrorMessage error={error} />;

        const nameInputEl = showRegister && (
            <TextInput
                label={`Name`}
                value={name}
                onChangeText={this.setName}
            />
        );

        return (
            <DismissKeyboardView>
                <View style={styles.container}>
                    <KeyboardAvoidingView
                        style={styles.innerContainer}
                        behavior={`position`}
                    >
                        {errorEl}
                        <TextInput
                            label={`Email`}
                            value={email}
                            keyboardType={`email-address`}
                            autoCapitalize={`none`}
                            onChangeText={this.setEmail}
                        />
                        <TextInput
                            label={`Password`}
                            value={password}
                            onChangeText={this.setPassword}
                        />
                        {nameInputEl}
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
