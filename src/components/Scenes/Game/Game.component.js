import React, { Component } from "react";

import { Alert, View } from "react-native";

import PropTypes from "prop-types";

import { ActionButton, Text } from "/components";

import { Actions } from "react-native-router-flux";

import { firebase, fireFetch, db } from "/services";

import styles from "./Game.styles";

class Game extends Component {
    static propTypes = {
        gameId: PropTypes.string.isRequired,
        gameCode: PropTypes.number
    };

    state = {
        state: `OPEN`,
        isStarting: false,
        isQuitting: false,
        players: []
    };

    async componentDidMount() {
        const { gameId, gameCode } = this.props;

        if (gameCode) {
            Alert.alert(
                `Game Created!`,
                `Your game has been created and the code is ${gameCode}`
            );
        }

        this.playersListener = db
            .collection(`games`)
            .doc(gameId)
            .collection(`players`)
            .onSnapshot(snapshot => {
                this.setState({
                    players: snapshot.docs.map(doc => doc.data())
                });
            });

        this.gameListener = db
            .collection(`games`)
            .doc(gameId)
            .onSnapshot(snapshot => {
                const data = snapshot.data();

                if (data) {
                    const { state } = data;

                    this.setState({
                        state
                    })
                }
            });
    }

    componentWillUnmount() {
        this.playersListener();
        this.gameListener();
    }

    quitGame = async () => {
        const { gameId } = this.props;
        const userId = firebase.auth().currentUser.uid;

        try {
            this.setState({
                isQuitting: true
            });

            await fireFetch(`quitGame`, {
                queryParams: {
                    userId,
                    gameId
                }
            });

            Actions.pop();
        } catch ({ message }) {
            this.setState({
                error: message
            });
        } finally {
            this.setState({
                isQuitting: true
            });
        }
    };

    startGame = async () => {
        const { gameId } = this.props;

        try {
            this.setState({
                isStarting: true
            });

            await fireFetch(`startGame`, {
                queryParams: {
                    gameId
                }
            });
        } catch ({ message }) {
            this.setState({
                error: message
            });
        } finally {
            this.setState({
                isStarting: false
            });
        }
    };

    render() {
        const { isQuitting, players, isStarting, state } = this.state;
        const startGameButtonEl = state === `OPEN` && (
            <ActionButton
                isLoading={isStarting}
                onPress={this.startGame}
            >
                {`Start Game`}
            </ActionButton>
        );

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{`Game State: ${state}`}</Text>
                <Text style={styles.title}>{`Players:`}</Text>
                {players.map(({ name, id }, i) => (
                    <View key={id}>
                        <Text>{`${i + 1}. ${name}`}</Text>
                    </View>
                ))}
                {startGameButtonEl}
                <ActionButton
                    isLoading={isQuitting}
                    onPress={this.quitGame}
                >
                    {`Quit Game`}
                </ActionButton>
            </View>
        );
    }
}

Game.key = `GAME_KEY`;

export default Game;
