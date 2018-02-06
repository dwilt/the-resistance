import React, { PureComponent } from 'react';

import { View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import PropTypes from 'prop-types';

import { Text } from 'components';

import styles from './Header.styles';

export default class Header extends PureComponent {
    static propTypes = {
        username: PropTypes.string,
    };

    render() {
        const { username } = this.props;

        return (
            <View style={styles.container}>
                <Text>{username}</Text>
                <Icon name={`times`} size={30} color={`#ffffff`} />
                <Icon name={`bars`} size={30} color={`#ffffff`} />
            </View>
        );
    }
}
