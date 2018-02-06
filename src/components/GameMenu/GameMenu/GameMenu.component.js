import React, { PureComponent } from 'react';

import { View } from 'react-native';

import { GameCode, Scene, GameMenuToggle, QuitGameButton } from 'components';

import styles from './GameMenu.styles';

class GameMenu extends PureComponent {
    render() {
        return (
            <Scene menuToggle={<GameMenuToggle />}>
                <View style={styles.container}>
                    <View style={styles.gameCode}>
                        <GameCode />
                    </View>
                    <QuitGameButton />
                </View>
            </Scene>
        );
    }
}

GameMenu.key = `GameMenu`;

export default GameMenu;
