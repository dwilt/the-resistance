import React, { PureComponent } from 'react';

import { View, Image } from 'react-native';

import PropTypes from 'prop-types';

import { Text, MenuToggle } from 'components';

import styles from './Header.styles';

const userIcon = require(`assets/images/user-icon.png`);

export default class Header extends PureComponent {
    static propTypes = {
        username: PropTypes.string,
    };

    render() {
        const { username } = this.props;

        return (
            <View style={styles.container}>
                <Image style={styles.icon} source={userIcon} />
                <Text style={styles.username}>{username}</Text>
                <MenuToggle />
            </View>
        );
    }
}
