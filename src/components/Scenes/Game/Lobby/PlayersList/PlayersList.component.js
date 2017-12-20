import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Text } from 'components';

import { Image, View } from 'react-native';
import styles from './PlayersList.styles';

class PlayersList extends Component {
    static propTypes = {
        players: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            }),
        ).isRequired,
    };

    render() {
        const { players } = this.props;

        return (
            <View style={styles.container}>
                {players.map(({ name, id }) => (
                    <View key={id} style={styles.player}>
                        <Image
                            style={styles.userIcon}
                            source={require(`../../../../../assets/images/user-icon.png`)}
                        />
                        <Text style={styles.name}>{name}</Text>
                    </View>
                ))}
            </View>
        );
    }
}

export default PlayersList;
