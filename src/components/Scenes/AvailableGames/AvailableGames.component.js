import React, {
    Component,
} from 'react';

import {
    View,
} from 'react-native';

import {
    LogoutButton,
   Text
} from '/components';

import {
    firebase
} from '/services';

import styles from './AvailableGames.styles';

class AvailableGames extends Component {
    state = {
        games: []
    };

    render() {
        const { games } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{`Join or Create a Game`}</Text>
                <LogoutButton/>
            </View>
        );
    }
}

AvailableGames.key = `AVAILABLE_GAMES_KEY`;

export default AvailableGames;
