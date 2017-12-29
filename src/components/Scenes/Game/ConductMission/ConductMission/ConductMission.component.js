import React, { Component } from 'react';

import { View } from 'react-native';

import PropTypes from 'prop-types';

import {
   Text,
    GameFooter,
    PassMissionButton,
    FailMissionButton,
    SubmitMissionVoteButton,
    ConductMissionPlayersList
} from 'components/index';

import styles from './ConductMission.styles';

export default class ConductMission extends Component {
    static propTypes = {
        submittedVote: PropTypes.bool.isRequired,
        canVote: PropTypes.bool.isRequired,
    };

    render() {
        const { submittedVote, canVote } = this.props;

        const content = canVote ? (
            <View>
                {!submittedVote && (
                    <View>
                        <View style={styles.voteButtons}>
                            <View style={styles.approveButton}>
                                <PassMissionButton />
                            </View>
                            <View style={styles.rejectButton}>
                                <FailMissionButton />
                            </View>
                        </View>
                        <View style={styles.submitButton}>
                            <SubmitMissionVoteButton/>
                        </View>
                    </View>
                )}
                {submittedVote && (
                    <View style={styles.submittedVoteContainer}>
                        <Text style={styles.submittedVote}>{`Vote Submitted!`}</Text>
                    </View>
                )}
            </View>
        ) : (
            <Text>{`Waiting for mission team to vote`}</Text>
        );

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>{`Vote On Mission Success`}</Text>
                    <Text style={styles.subtitle}>{`Keep This Secret!`}</Text>
                    <ConductMissionPlayersList/>
                    {content}
                </View>
                <GameFooter/>
            </View>
        );
    }
}
