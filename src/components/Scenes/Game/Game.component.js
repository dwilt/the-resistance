import React, {
    Component,
} from 'react';

import {
    View,
} from 'react-native';

import {
    ActionButton,
   Text
} from '/components';

import {
    Actions
} from 'react-native-router-flux';

import {
    firebase
} from '/services';

import styles from './Game.styles';

class Game extends Component {
    componentDidMount() {
        console.log(this.props);
    }

    quitGame = () => {
        Actions.pop();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{`Game`}</Text>
                <ActionButton
                    onPress={this.quitGame}
                >
                    {`Quit Game`}
                </ActionButton>
            </View>
        );
    }
}

Game.key = `GAME_KEY`;

export default Game;
