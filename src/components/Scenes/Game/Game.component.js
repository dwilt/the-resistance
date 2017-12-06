import React, { Component } from "react";

import { Alert, View } from "react-native";

import { ActionButton, Text } from "/components";

import { Actions } from "react-native-router-flux";

import { firebase, fireFetch } from "/services";

import styles from "./Game.styles";

class Game extends Component {
    state = {
        isQuitting: false,
        players: []
    };

    quitGame = async () => {
        const { gameId } = this.props;
        const userId = firebase.auth().currentUser.uid;

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
    };

    render() {
        const { isQuitting } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{`Players:`}</Text>
                <ActionButton isLoading={isQuitting} onPress={this.quitGame}>
                    {`Quit Game`}
                </ActionButton>
            </View>
        );
    }
}

Game.key = `GAME_KEY`;

export default Game;
