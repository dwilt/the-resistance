import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
    Text,
    StartNextRoundButton,
    GameFooter,
    FailedMissionCard,
    PassedMissionCard,
} from 'components';

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
        const {
            isHost,
            passed,
            totalFailedVotes,
            totalPassedVotes,
        } = this.props;

        let subtitleText = !isHost && `Host will start next round`;

        const subtitle = subtitleText && (
            <Text style={styles.subtitle}>{subtitleText}</Text>
        );

        const resultTitle = passed ? `success` : `fail`;

        const successNumberStyles = [styles.voteNumber];
        const failNumberStyles = [styles.voteNumber];

        if (passed) {
            successNumberStyles.push(styles.majorityVoteNumber);
        } else {
            failNumberStyles.push(styles.majorityVoteNumber);
        }

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Mission Result</Text>
                    {subtitle}
                    <View style={styles.innerContent}>
                        <Text style={styles.resultTitle}>
                            {resultTitle.toUpperCase()}
                        </Text>
                        <View style={styles.cards}>
                            <View style={styles.firstCard}>
                                <PassedMissionCard />
                                <Text style={successNumberStyles}>
                                    {totalPassedVotes}
                                </Text>
                            </View>
                            <View>
                                <FailedMissionCard />
                                <Text style={failNumberStyles}>
                                    {totalFailedVotes}
                                </Text>
                            </View>
                        </View>
                        {isHost && <StartNextRoundButton />}
                    </View>
                </View>
                <GameFooter />
            </View>
        );
    }
}
