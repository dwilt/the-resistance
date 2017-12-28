import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Text } from 'components/index';

import { View } from 'react-native';
import styles from './RoundCount.styles';

export default class RoundCount extends Component {
    static propTypes = {
        roundCount: PropTypes.number.isRequired,
        passedMissions: PropTypes.number.isRequired,
        failedMissions: PropTypes.number.isRequired,
    };

    render() {
        const { roundCount, failedMissions, passedMissions } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.numberContainer}>
                    <Text style={[styles.number, styles.passedNumber]}>
                        {passedMissions}
                    </Text>
                    <Text style={styles.numberText}>
                        {`Missions Passed`.toUpperCase()}
                    </Text>
                </View>
                <View style={styles.numberContainer}>
                    <Text style={[styles.number, styles.roundNumber]}>
                        {roundCount}
                    </Text>
                    <Text style={styles.numberText}>
                        {`Round Count`.toUpperCase()}
                    </Text>
                </View>
                <View
                    style={[styles.numberContainer, styles.lastNumberContainer]}
                >
                    <Text style={[styles.number, styles.failedNumber]}>
                        {failedMissions}
                    </Text>
                    <Text style={styles.numberText}>
                        {`Missions Failed`.toUpperCase()}
                    </Text>
                </View>
            </View>
        );
    }
}
