import React, { PureComponent } from "react";

import { Scene, Router, Actions } from "react-native-router-flux";

import { Home, Game, Login } from "/components";

import { firebase } from "/services";

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        Actions[Home.key]();
    } else {
        if (Actions.currentScene !== Login.key) {
            Actions[Login.key]();
        }
    }
});

export default class TheResistance extends PureComponent {
    render() {
        return (
            <Router
                sceneStyle={{
                    backgroundColor: `white`
                }}
            >
                <Scene hideNavBar panHandlers={null} key={`root`}>
                    <Scene initial key={Login.key} component={Login} />
                    <Scene key={Home.key} component={Home} />
                    <Scene key={Game.key} component={Game} />
                </Scene>
            </Router>
        );
    }
}
