import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { fireFetch } from 'services';

import { View } from 'react-native';

import { PlayersList, ActionButton, GameCode, Text } from 'components';

import styles from './Lobby.styles';

class Lobby extends Component {
    static propTypes = {
        gameCode: PropTypes.string.isRequired,
        gameId: PropTypes.string.isRequired,
        players: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            }),
        ).isRequired,
        isHost: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        isHost: false,
    };

    state = {
        isStarting: false,
    };

    startGame = async () => {
        const { gameId } = this.props;

        try {
            this.setState({
                isStarting: true,
            });

            await fireFetch(`startGame`, {
                gameId,
            });
        } catch ({ message }) {
            this.setState({
                error: message,
            });
        } finally {
            this.setState({
                isStarting: false,
            });
        }
    };

    render() {
        const { isStarting } = this.state;
        const { players, isHost, gameCode } = this.props;

        const startGameButton = isHost && (
            <ActionButton isLoading={isStarting} onPress={this.startGame}>
                {`Start Game`}
            </ActionButton>
        );

        const waitingForHost = !isHost && (
            <Text
                style={styles.waitingForHost}
            >{`Waiting for host to start the game...`}</Text>
        );

        return (
            <View style={styles.container}>
                <GameCode code={gameCode} />
                <View style={styles.players}>
                    <PlayersList players={players} />
                </View>
                {startGameButton}
                {waitingForHost}
            </View>
        );
    }
}

export default Lobby;
