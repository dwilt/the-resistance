import React, { Component } from 'react';

import { Image, View } from 'react-native';

import {
    CreateGameButton,
    Scene,
    PlayerCard,
    JoinExistingGameButton,
    JoinGameOverlay,
    HomeError,
    LogoutButton,
} from 'components';

import styles from './Home.styles';

const logo = require(`assets/images/resistance-logo.png`);

class Home extends Component {
    render() {
        return (
            <Scene>
                <View style={styles.container}>
                    <HomeError />
                    <View style={styles.logoContainer}>
                        <Image source={logo} style={styles.logo} />
                    </View>
                    <View style={styles.cardsContainer}>
                        <PlayerCard />
                        <View style={styles.spyCard}>
                            <PlayerCard isSpy={true} />
                        </View>
                    </View>
                    <JoinExistingGameButton />
                    <CreateGameButton />
                    <LogoutButton/>
                </View>
                <JoinGameOverlay />
            </Scene>
        );
    }
}

Home.key = `Home_KEY`;

export default Home;
