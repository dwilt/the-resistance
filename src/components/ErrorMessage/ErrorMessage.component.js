import React, { PureComponent } from 'react';

import { View } from 'react-native';

import PropTypes from 'prop-types';

import { Text } from 'components';

import styles from './ErrorMessage.styles';

export default class ErrorMessage extends PureComponent {
    static propTypes = {
        error: PropTypes.string,
    };

    render() {
        const { error } = this.props;

        return error ? (
            <View style={styles.container}>
                <Text style={styles.error}>{error}</Text>
            </View>
        ) : null;
    }
}
