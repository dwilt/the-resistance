import React, { Component } from 'react';

import { Image } from 'react-native';

import PropTypes from 'prop-types';

import {
    Text,
    StartNextRoundButton,
    GameFooter,
    FailedMissionCard,
    PassedMissionCard,
    ConductMissionPlayersList,
} from 'components';

import { View } from 'react-native';

const passedStamp = require(`assets/images/mission-passed-stamp.png`);
const failedStamp = require(`assets/images/mission-failed-stamp.png`);

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

        const stamp = passed ? passedStamp : failedStamp;

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
                    <View style={styles.innerContent}>
                        <View style={styles.playersListContainer}>
                            <View style={styles.playersList}>
                                <ConductMissionPlayersList />
                            </View>
                            <Image style={styles.stamp} source={stamp} />
                        </View>
                        <View style={styles.cards}>
                            <View style={styles.firstCard}>
                                <PassedMissionCard width={50} />
                                <Text style={successNumberStyles}>
                                    {totalPassedVotes}
                                </Text>
                            </View>
                            <View>
                                <FailedMissionCard width={50} />
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
