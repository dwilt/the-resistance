import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { View } from 'react-native';

import { GameCode, Text, StartGameButton, LobbyPlayersList } from 'components';

import styles from './Lobby.styles';

class Lobby extends Component {
    static propTypes = {
        host: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
    };

    static defaultProps = {
        isHost: false,
    };

    render() {
        const { host, userId } = this.props;
        const isHost = userId === host;

        return (
            <View style={styles.container}>
                <GameCode />
                <View style={styles.players}>
                    <LobbyPlayersList />
                </View>
                {isHost && (
                    <View style={styles.startGameButton}>
                        <StartGameButton />
                    </View>
                )}
                {!isHost && (
                    <Text
                        style={styles.waitingForHost}
                    >{`Waiting for host to start the game...`}</Text>
                )}
            </View>
        );
    }
}

export default Lobby;
