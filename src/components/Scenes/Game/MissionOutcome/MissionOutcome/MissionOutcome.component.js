import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Text, StartNextRoundButton, GameFooter } from 'components';

import { View } from 'react-native';

import styles from './MissionOutcome.styles';

export default class MissionOutcome extends Component {
    static propTypes = {
        isHost: PropTypes.bool.isRequired,
        passed: PropTypes.bool.isRequired,
        totalPassedVotes: PropTypes.number.isRequired,
        totalFailedVotes: PropTypes.number.isRequired,
    };
    render() {
        const { isHost, passed, totalFailedVotes, totalPassedVotes } = this.props;

        const text = passed ? `Mission passed!` : `Mission failed!`;

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text>{text}</Text>
                    <Text>{`Passed: ${totalPassedVotes}`}</Text>
                    <Text>{`Failed: ${totalFailedVotes}`}</Text>
                    {isHost && <StartNextRoundButton />}
                </View>
                <GameFooter/>
            </View>
        );
    }
}
