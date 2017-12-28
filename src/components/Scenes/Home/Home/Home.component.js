import React, { Component } from 'react';

import { Image, View, LayoutAnimation, TouchableOpacity } from 'react-native';

import {
    ActionButton,
    ErrorMessage,
    Game,
    JoinGameButton,
    JoinGameInput,
    Scene,
    PlayerCard,
} from 'components';

import { Actions } from 'react-native-router-flux';

import { firebase, fireFetch } from 'services/index';

import styles from './Home.styles';

const logo = require(`assets/images/resistance-logo.png`);

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

    render() {
        const { isCreatingGame, error, showJoinGameOverlay } = this.state;
        const errorEl = error && <ErrorMessage error={error} />;

        const joinGameOverlay = showJoinGameOverlay && (
            <TouchableOpacity
                onPress={this.hideJoinGameOverlay}
                style={styles.joinGameOverlay}
            >
                <View style={styles.joinCodeInput}>
                    <JoinGameInput />
                </View>
                <JoinGameButton />
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
