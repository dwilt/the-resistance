import React, {
    Component,
} from 'react';

import {
    View,
} from 'react-native';

import {
    TextButton,
    LogoutButton,
   Text,
    Game,
} from '/components';

import {
    Actions,
} from 'react-native-router-flux';

import {
    firebase
} from '/services';

import styles from './AvailableGames.styles';

class AvailableGames extends Component {
    state = {
        games: []
    };

    componentDidMount() {
        const gamesRef = firebase.database().ref(`games`);

        gamesRef.on(`child_added`, (snapshot) => {
            const child = snapshot.val();
            const key = snapshot.key;

            this.setState(() => ({
                games: [
                    ...this.state.games,
                    {
                        ...child,
                        key
                    }
                ]
            }))
        });
    }

    joinGame = (gameKey) => {
        Actions[Game.key]({
            gameKey
        })
    }

    render() {
        const { games } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{`Join or Create a Game`}</Text>
                {games.map(({ key, name }) => {
                    console.log(key, name);

                    return (
                        <TextButton
                            key={key}
                            onPress={() => this.joinGame(key)}
                        >
                            {name}
                        </TextButton>
                    )
                })}
                <LogoutButton/>
            </View>
        );
    }
}

AvailableGames.key = `AVAILABLE_GAMES_KEY`;

export default AvailableGames;
