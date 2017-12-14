import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { ActionButton } from '../../../Core/ActionButton';

import { firebase, fireFetch, db } from '/services';

import { View } from 'react-native';

import { Text } from '../../../Core/Text';

import styles from './Lobby.styles';

class Lobby extends Component {
    static propTypes = {
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
        const { players, isHost } = this.props;

        const startGameButton = isHost && (
            <ActionButton isLoading={isStarting} onPress={this.startGame}>
                {`Start Game`}
            </ActionButton>
        );

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{`Players:`}</Text>
                {players.map(({ name, id }, i) => (
                    <View key={id}>
                        <Text>{`${i + 1}. ${name}`}</Text>
                    </View>
                ))}
                {startGameButton}
            </View>
        );
    }
}

export default Lobby;
