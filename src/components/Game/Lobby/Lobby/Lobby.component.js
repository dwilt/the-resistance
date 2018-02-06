import React, { Component } from "react";

import PropTypes from "prop-types";

import { View } from "react-native";

import { GameCode, Text, StartGameButton, LobbyPlayersList } from "components";

import styles from "./Lobby.styles";

class Lobby extends Component {
    static propTypes = {
        isHost: PropTypes.bool.isRequired,
    };

    render() {
        const { isHost } = this.props;

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
                    <Text style={styles.waitingForHost}>
                        Waiting for the host to start the game...
                    </Text>
                )}
            </View>
        );
    }
}

export default Lobby;
