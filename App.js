import React from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native';

import firebase from 'react-native-firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB2lvG8eGKIEbRaDTeRKixX925Lnn-tm38",
    // authDomain: "<your-auth-domain>",
    databaseURL: "https://the-resistance-6d42d.firebaseio.com/",
    // storageBucket: "<your-storage-bucket>",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// firebase.database().ref(`state`).set({
//     names: ['Dan'],
//     name: `Steve`
// });

const starCountRef = firebase.database().ref(`state/name`);


export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            name: ``,
        };
    }

    componentDidMount() {
        starCountRef.on('value', (snapshot) => {
            const name = snapshot.val();

            this.setState(() => ({
                name
            }))
        });
    }

    render() {
        const { name } = this.state;


        return (
            <View style={styles.container}>
                <Image source={require('./assets/RNFirebase512x512.png')} style={[styles.logo]}/>
                <Text style={styles.welcome}>
                    {name}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    logo: {
        height: 80,
        marginBottom: 16,
        width: 80,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    modules: {
        margin: 20,
    },
    modulesHeader: {
        fontSize: 16,
        marginBottom: 8,
    },
    module: {
        fontSize: 14,
        marginTop: 4,
        textAlign: 'center',
    }
});
