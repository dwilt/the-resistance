import React, { PureComponent } from 'react';

import { View } from 'react-native';

import PropTypes from 'prop-types';

import { Scene, Text } from 'components';

import styles from './Menu.styles';

class Menu extends PureComponent {
    static propTypes = {};

    render() {
        const {} = this.props;

        return (
            <Scene>
                <Text>hey</Text>
            </Scene>
        );
    }
}

Menu.key = `Menu`;

export default Menu;
