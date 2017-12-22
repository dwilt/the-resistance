import React, { PureComponent } from 'react';

import { Image, View } from 'react-native';

import PropTypes from 'prop-types';

import { Text } from 'components';

const userIcon = require(`../../../assets/images/user-icon.png`);

import styles from './PlayerBox.styles';

export default class PlayerBox extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
    };

    render() {
        const { name } = this.props;

        return (
            <View style={styles.container}>
                <Image style={styles.userIcon} source={userIcon} />
                <Text style={styles.name}>{name}</Text>
            </View>
        );
    }
}
