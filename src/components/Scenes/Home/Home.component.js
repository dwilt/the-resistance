import React, { Component } from "react";

import { View } from "react-native";

import {
    ActionButton,
    ErrorMessage,
    LogoutButton,
    Game,
    TextInput,
} from "/components";

import { Actions } from "react-native-router-flux";

import { firebase, fireFetch } from "/services";

import styles from "./Home.styles";

class Home extends Component {
    state = {
        error: null,
        isCreatingGame: false,
        isJoiningGame: false,
        gameCode: ``,
    };

    joinGame = async () => {
        const { gameCode } = this.state;
        const userId = firebase.auth().currentUser.uid;

        try {
            this.setState({
                error: null,
                isJoiningGame: true,
            });

            const { gameId } = await fireFetch(`joinGame`, {
                gameCode,
                userId,
            });

            Actions[Game.key]({
                gameId,
            });
        } catch ({ message }) {
            this.setState({
                error: message,
            });
        } finally {
            this.setState({
                isJoiningGame: false,
            });
        }
    };

    createGame = async () => {
        const userId = firebase.auth().currentUser.uid;

        try {
            this.setState({
                isCreatingGame: true,
            });

            const { gameCode, gameId } = await fireFetch(`createGame`, {
                userId,
            });

            Actions[Game.key]({
                hostId: userId,
                gameId,
                gameCode,
            });
        } catch ({ message }) {
            this.setState({
                error: message,
            });
        } finally {
            this.setState({
                isCreatingGame: false,
            });
        }
    };

    setGameCode = (gameCode) =>
        this.setState({
            gameCode,
        });

    render() {
        const { isCreatingGame, isJoiningGame, gameCode, error } = this.state;
        const errorEl = error && <ErrorMessage error={error} />;

        return (
            <View style={styles.container}>
                <View style={styles.join}>
                    {errorEl}
                    <TextInput
                        onChangeText={this.setGameCode}
                        value={gameCode}
                        placeholder={`Enter a game code here`}
                    />
                    <ActionButton
                        onPress={this.joinGame}
                        isLoading={isJoiningGame}
                    >
                        {`Join Game`}
                    </ActionButton>
                </View>
                <ActionButton
                    onPress={this.createGame}
                    isLoading={isCreatingGame}
                >
                    {`Create Game`}
                </ActionButton>
                <LogoutButton />
            </View>
        );
    }
}

Home.key = `Home_KEY`;

export default Home;
