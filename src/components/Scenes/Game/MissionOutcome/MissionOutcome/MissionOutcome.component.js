import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Text, StartNextRoundButton } from 'components';

import { View } from 'react-native';

import styles from './MissionOutcome.styles';

export default class MissionOutcome extends Component {
    static propTypes = {
        isHost: PropTypes.bool.isRequired,
        passed: PropTypes.bool.isRequired,
    };
    render() {
        const { isHost, passed } = this.props;

        const text = passed ? `Mission passed!` : `Mission failed!`;

        return (
            <View style={styles.container}>
                <Text>{text}</Text>
                {isHost && <StartNextRoundButton />}
            </View>
        );
    }
}
