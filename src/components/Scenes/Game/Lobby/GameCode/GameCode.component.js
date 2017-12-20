import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Text } from 'components';

import { View } from 'react-native';
import styles from './GameCode.styles';

class GameCode extends Component {
    static propTypes = {
        code: PropTypes.string.isRequired,
    };

    render() {
        const { code } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Game Code:</Text>
                <Text style={styles.code}>{code}</Text>
            </View>
        );
    }
}

export default GameCode;
