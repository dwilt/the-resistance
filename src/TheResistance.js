import React, {
    PureComponent,
} from 'react';

import { StyleSheet, Platform, Image, Text, View, TouchableOpacity } from 'react-native';

// import {
//     Provider,
// } from 'react-redux';
//
// import store from './store';
//
// import {
//     Routes,
// } from './components';

import firebase from './services/firebase.service';
import ActionButton from "./components/Core/ActionButton/ActionButton.component";

const gamesRef = firebase.database().ref(`games`);

export default class TheResistance extends PureComponent {
    state = {
        games: [],
    };

    componentDidMount() {
        gamesRef.on('child_added', (snapshot) => {
            const child = snapshot.val();

            this.setState(() => ({
                games: [
                    ...this.state.games,
                    child
                ]
            }))
        });
    }

    createGame = () => {
        const newGame = gamesRef.push();

        newGame.set({
            creator: `Dan`,
            name: `A New Game`
        });
    };

    render() {
        const { games } = this.state;

        console.log(games);

        return (
            <View style={{ paddingTop: 60 }}>
                {games.map((game, i) => {
                    console.log(game);

                    return (
                        <View key={i}>
                            <Text>{game.name}</Text>
                        </View>
                    )
                })}
                <ActionButton
                    onPress={this.createGame}
                >
                    {`Create Game`}
                </ActionButton>
            </View>
        );
    }
}