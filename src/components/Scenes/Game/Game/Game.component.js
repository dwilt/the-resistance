import React, { Component } from 'react';

import { Alert, View } from 'react-native';

import PropTypes from 'prop-types';

import { firebase, fireFetch, db } from '/services/index';

import { gameStates } from '../../../../../assets/gameStructure';

import { PlayerReveal } from '../PlayerReveal/index';
import { Lobby } from '../Lobby';
import { BuildMissionTeam } from '../BuildMissionTeam';

class Game extends Component {
    static propTypes = {
        gameId: PropTypes.string.isRequired,
        hostId: PropTypes.string,
        gameCode: PropTypes.number,
    };

    state = {
        isHost: false,
        state: gameStates.Home,
        isQuitting: false,
        players: [],
        roundNumber: 1,
    };

    async componentDidMount() {
        const { gameId, gameCode } = this.props;
        const userId = firebase.auth().currentUser.uid;

        if (gameCode) {
            this.setState({
                isHost: true,
            });

            Alert.alert(
                `Game Created!`,
                `Your game has been created and the code is ${gameCode}`,
            );
        }

        this.playersListener = db
            .collection(`games`)
            .doc(gameId)
            .collection(`players`)
            .onSnapshot(({ docs }) => {
                this.setState({
                    players: docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    })),
                });
            });

        this.gameListener = db
            .collection(`games`)
            .doc(gameId)
            .onSnapshot(snapshot => {
                const data = snapshot.data();

                if (data) {
                    const { state, host } = data;

                    console.log(state);

                    this.setState({
                        isHost: userId === host,
                        state,
                    });
                }
            });

        this.gameListener = db
            .collection(`games`)
            .doc(gameId)
            .collection(`completedMissions`)
            .onSnapshot(({ docs }) => {
                this.setState({
                    roundNumber: docs.length + 1,
                });
            });
    }

    componentWillUnmount() {
        this.playersListener();
        this.gameListener();
    }

    render() {
        const userId = firebase.auth().currentUser.uid;
        const { gameId } = this.props;
        const { players, state, isHost, roundNumber } = this.state;
        const { isSpy } = players.find(player => player.id === userId) || {};

        const lobby = (
            <Lobby gameId={gameId} players={players} isHost={isHost} />
        );

        switch (state) {
            case gameStates.PLAYER_REVEAL: {
                if (typeof isSpy !== `undefined`) {
                    return <PlayerReveal isSpy={isSpy} gameId={gameId} />;
                } else {
                    return lobby;
                }
            }

            case gameStates.BUILD_MISSION_TEAM:
                return (
                    <BuildMissionTeam
                        players={players}
                        isHost={isHost}
                        gameId={gameId}
                        roundNumber={roundNumber}
                    />
                );

            default:
                return lobby;
        }
    }
}

Game.key = `GAME_KEY`;

export default Game;
