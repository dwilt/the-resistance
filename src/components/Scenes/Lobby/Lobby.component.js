import React, { Component } from "react";

import { View } from "react-native";

import {
    ActionButton,
    ErrorMessage,
    LogoutButton,
    Text,
    Game,
    TextInput
} from "/components";

import { Actions } from "react-native-router-flux";

import { firebase, fireFetch, db } from "/services";

import styles from "./Lobby.styles";

class Lobby extends Component {
    state = {
        error: null,
        isCreatingGame: false,
        isJoiningGame: false,
        gameCode: ``
    };

    async componentDidMount() {
        // const userId = firebase.auth().currentUser.uid;

        const deleted = await db
            .collection(`games`)
            .doc(`aitX7gHEKZlzLY6uwL3I`)
            .delete();

        console.log(deleted);
    }

    joinGame = async () => {
        const { gameCode } = this.state;
        const userId = firebase.auth().currentUser.uid;

        try {
            this.setState({
                error: null,
                isJoiningGame: true
            });

            const { gameId } = await fireFetch(`joinGame`, {
                queryParams: {
                    gameCode,
                    userId
                }
            });

            Actions[Game.key]({
                gameId
            });
        } catch ({ message }) {
            this.setState({
                error: message
            });
        } finally {
            this.setState({
                isJoiningGame: false
            });
        }
    };

    createGame = async () => {
        const userId = firebase.auth().currentUser.uid;

        try {
            this.setState({
                isCreatingGame: true
            });

            const { gameCode, gameId } = await fireFetch(`createGame`, {
                queryParams: {
                    userId
                }
            });

            Actions[Game.key]({
                gameId,
                gameCode
            });
        } catch ({ message }) {
            this.setState({
                error: message
            });
        } finally {
            this.setState({
                isCreatingGame: false
            });
        }
    };

    setGameCode = gameCode =>
        this.setState({
            gameCode
        });

    render() {
        const { isCreatingGame, isJoiningGame, gameCode, error } = this.state;
        const errorEl = error && <ErrorMessage error={error}/>;

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
                <LogoutButton/>
            </View>
        );
    }
}

Lobby.key = `LOBBY_KEY`;

export default Lobby;
