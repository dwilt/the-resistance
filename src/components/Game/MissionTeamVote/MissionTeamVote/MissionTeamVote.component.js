import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
    GameFooter,
    Text,
    ApproveTeamButton,
    RejectTeamButton,
    MissionTeamVotePlayersList,
    RevealVotesButton,
    SubmitVoteButton,
    ChangeVoteButton,
} from 'components';

import { View } from 'react-native';

import styles from './MissionTeamVote.styles';

export default class MissionTeamVote extends Component {
    static propTypes = {
        submittedVote: PropTypes.bool.isRequired,
        isHost: PropTypes.bool.isRequired,
    };

    render() {
        const { isHost, submittedVote } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Vote on Mission Team</Text>
                    <Text style={styles.subtitle}>Keep this secret!</Text>
                    <View style={styles.players}>
                        <MissionTeamVotePlayersList />
                    </View>
                    {submittedVote && (
                        <View style={styles.submittedVoteContainer}>
                            <Text style={styles.submittedVote}>
                                Vote submitted!
                            </Text>
                            <ChangeVoteButton />
                        </View>
                    )}
                    {isHost &&
                        submittedVote && (
                            <View style={styles.revealVotesButton}>
                                <RevealVotesButton />
                            </View>
                        )}
                    {!submittedVote && (
                        <View style={styles.voteButtons}>
                            <View style={styles.approveButton}>
                                <ApproveTeamButton />
                            </View>
                            <RejectTeamButton />
                        </View>
                    )}
                    {!submittedVote && (
                        <View style={styles.submitButton}>
                            <SubmitVoteButton />
                        </View>
                    )}
                </View>
                <GameFooter />
            </View>
        );
    }
}
