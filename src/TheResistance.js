import React, { PureComponent } from 'react';

import { Provider } from 'react-redux';

import { Scene, Router } from 'react-native-router-flux';

import { Home, Game, Login, ForgotPasswordMenu, GameMenu } from 'components';

import store from 'store';

import styles from './TheResistance.styles';

export default class TheResistance extends PureComponent {
    render() {
        return (
            <Provider store={store}>
                <Router sceneStyle={styles.container}>
                    <Scene hideNavBar panHandlers={null} key={`modal`} modal>
                        <Scene hideNavBar panHandlers={null} key={`root`}>
                            <Scene initial key={Login.key} component={Login} />
                            <Scene key={Home.key} component={Home} />
                            <Scene key={Game.key} component={Game} />
                        </Scene>
                        <Scene
                            key={ForgotPasswordMenu.key}
                            component={ForgotPasswordMenu}
                        />
                        <Scene key={GameMenu.key} component={GameMenu} />
                    </Scene>
                </Router>
            </Provider>
        );
    }
}
