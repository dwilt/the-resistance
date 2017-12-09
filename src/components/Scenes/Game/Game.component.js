import React, { Component } from "react";

import { Alert, View } from "react-native";

import PropTypes from "prop-types";

import { ActionButton, Text } from "/components";

import { Actions } from "react-native-router-flux";

import { firebase, fireFetch, db } from "/services";

import styles from "./Game.styles";

import { gameStates } from "../../../../assets/gameStructure";

import { sampleSize, difference } from "lodash";

class Game extends Component {
    static propTypes = {
        gameId: PropTypes.string.isRequired,
        hostId: PropTypes.string,
        gameCode: PropTypes.number
    };

    state = {
        isHost: false,
        state: `OPEN`,
        isStarting: false,
        isQuitting: false,
        players: []
    };

    async componentDidMount() {
        const { gameId, gameCode } = this.props;
        const userId = firebase.auth().currentUser.uid;

        if (gameCode) {
            this.setState({
                isHost: true
            });

            Alert.alert(
                `Game Created!`,
                `Your game has been created and the code is ${gameCode}`
            );
        }

        // const gameDoc = await db
        //     .collection(`games`)
        //     .doc(gameId)
        //     .get();
        //
        // const { leader, missionTeam, missionTeamVotes } = gameDoc.data();
        //
        // console.log({
        //     leader,
        //     missionTeam,
        //     missionTeamVotes
        // });
        //
        // await gameDoc.ref.collection(`failedTeamAssembles`).add({
        //     leader: `234234`,
        //     missionTeam: [1,3,4],
        //     missionTeamVotes: {
        //         someGuy: false
        //     }
        // });

        // await fireFetch(`voteForMissionTeam`, {
        //     userId,
        //     gameId,
        //     approves: false
        // });

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
                    const { state, host } = data;

                    this.setState({
                        isHost: userId === host,
                        state
                    });
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
                userId,
                gameId
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
                gameId
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
        const { isQuitting, players, isStarting, state, isHost } = this.state;

        const startGameButtonEl = state === gameStates.LOBBY &&
            isHost && (
                <ActionButton isLoading={isStarting} onPress={this.startGame}>
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
                <ActionButton isLoading={isQuitting} onPress={this.quitGame}>
                    {`Quit Game`}
                </ActionButton>
            </View>
        );
    }
}

Game.key = `GAME_KEY`;

export default Game;
