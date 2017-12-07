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
        gameCode: PropTypes.string,
    };

    state = {
        isQuitting: false,
        players: []
    };

    componentDidMount() {
        const { gameId, gameCode } = this.props;

        if(gameCode) {
            Alert.alert(`Game Created!`, `Your game has been created and the code is ${gameCode}`);
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
    }

    componentWillUnmount() {
        this.playersListener()
    }

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
        const { isQuitting, players } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{`Players:`}</Text>
                {players.map(({ name, id }) => (
                    <View key={id}>
                        <Text>{name}</Text>
                    </View>
                ))}
                <ActionButton isLoading={isQuitting} onPress={this.quitGame}>
                    {`Quit Game`}
                </ActionButton>
            </View>
        );
    }
}

Game.key = `GAME_KEY`;

export default Game;
