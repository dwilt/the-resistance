import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Image, TouchableOpacity, View, LayoutAnimation } from 'react-native';

import { Text } from 'components';

const userIcon = require(`../../../../../assets/images/user-icon.png`);

import styles from './PlayersList.styles';

class PlayersList extends Component {
    static propTypes = {
        players: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            }),
        ).isRequired,
        onPlayerTap: PropTypes.func,
        disabled: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        disabled: false,
    };

    componentWillReceiveProps() {
        LayoutAnimation.easeInEaseOut();
    }

    render() {
        const { players, onPlayerTap, disabled } = this.props;

        return (
            <View style={styles.container}>
                {players.map(({ name, id, selected }) => {
                    const playerStyles = [styles.player];
                    const playerNameStyles = [styles.playerName];
                    const playerDisabled = disabled && !selected;

                    if (selected) {
                        playerStyles.push(styles.selectedPlayer);
                        playerNameStyles.push(styles.selectedPlayerName);
                    }

                    if (playerDisabled) {
                        playerStyles.push(styles.disabledPlayer);
                    }

                    const playerContent = (
                        <View style={playerStyles}>
                            <Image style={styles.userIcon} source={userIcon} />
                            <Text style={playerNameStyles}>{name}</Text>
                        </View>
                    );

                    return onPlayerTap && !playerDisabled ? (
                        <TouchableOpacity
                            onPress={() => onPlayerTap(id, !selected)}
                            key={id}
                        >
                            {playerContent}
                        </TouchableOpacity>
                    ) : (
                        <View key={id}>{playerContent}</View>
                    );
                })}
            </View>
        );
    }
}

export default PlayersList;
