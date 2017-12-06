import React, { Component } from "react";

import { Alert, View } from "react-native";

import PropTypes from "prop-types";

import { ActionButton, Text } from "/components";

import { Actions } from "react-native-router-flux";

import { firebase, fireFetch, db } from "/services";

import styles from "./Game.styles";

class Game extends Component {
    static defaultProps = {
        gameId: PropTypes.string.isRequired
    };

    state = {
        isQuitting: false,
        players: []
    };

    componentDidMount() {
        const { gameId } = this.props;

        db
            .collection(`games`)
            .doc(gameId)
            .collection(`players`)
            .onSnapshot(snapshot => {
                console.log(snapshot);
                this.setState({
                    players: snapshot.docs.map(doc => doc.data())
                });
            });
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
