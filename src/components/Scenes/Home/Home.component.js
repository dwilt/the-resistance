import React, { Component } from 'react';

import { Image, View, LayoutAnimation, TouchableOpacity } from 'react-native';

import {
    ActionButton,
    ErrorMessage,
    Game,
    CodeInput,
    Scene,
    PlayerCard,
} from 'components';

import { Actions } from 'react-native-router-flux';

import { firebase, fireFetch } from '/services';

import styles from './Home.styles';

const logo = require(`../../../assets/images/resistance-logo.png`);

class Home extends Component {
    state = {
        error: null,
        isCreatingGame: false,
        isJoiningGame: false,
        gameCode: ``,
        showJoinGameOverlay: false,
    };

    componentWillReceiveProps() {
        LayoutAnimation.easeInEaseOut();
    }

    showJoinGameOverlay = () =>
        this.setState({
            showJoinGameOverlay: true,
        });

    hideJoinGameOverlay = () =>
        this.setState({
            showJoinGameOverlay: false,
        });

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
                gameCode,
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

    setGameCode = (gameCode) => {
        this.setState({
            gameCode,
        });
    };

    render() {
        const {
            isCreatingGame,
            isJoiningGame,
            gameCode,
            error,
            showJoinGameOverlay,
        } = this.state;
        const errorEl = error && <ErrorMessage error={error} />;

        const joinGameOverlay = showJoinGameOverlay && (
            <TouchableOpacity
                onPress={this.hideJoinGameOverlay}
                style={styles.joinGameOverlay}
            >
                <View style={styles.joinCodeInput}>
                    <CodeInput
                        onChangeText={this.setGameCode}
                        value={gameCode}
                        label={`Enter game code`}
                    />
                </View>
                <ActionButton
                    onPress={this.joinGame}
                    isLoading={isJoiningGame}
                    theme={`teal`}
                >
                    {`Join Game`}
                </ActionButton>
            </TouchableOpacity>
        );

        return (
            <Scene>
                <View style={styles.container}>
                    {errorEl}
                    <View style={styles.logoContainer}>
                        <Image source={logo} style={styles.logo} />
                    </View>
                    <View style={styles.cardsContainer}>
                        <PlayerCard />
                        <View style={styles.spyCard}>
                            <PlayerCard isSpy={true} />
                        </View>
                    </View>
                    <ActionButton
                        onPress={this.showJoinGameOverlay}
                        theme={`teal`}
                    >
                        {`Join Existing Game`}
                    </ActionButton>
                    <ActionButton
                        onPress={this.createGame}
                        isLoading={isCreatingGame}
                    >
                        {`Host New Game`}
                    </ActionButton>
                </View>
                {joinGameOverlay}
            </Scene>
        );
    }
}

Home.key = `Home_KEY`;

export default Home;
