import React, { Component } from "react";

import PropTypes from "prop-types";

import { ActionButton, Text } from "/components";

import { firebase, fireFetch } from "/services";
import { View } from "react-native";
import styles from "./MissionTeamVote.styles";

class MissionTeamVote extends Component {
    static propTypes = {
        submittedVote: PropTypes.bool.isRequired,
        votingComplete: PropTypes.bool.isRequired,
        isHost: PropTypes.bool.isRequired,
        gameId: PropTypes.string.isRequired,
        proposedTeamMembers: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })).isRequired,
    };

    static defaultProps = {
        votingComplete: false,
    };

    state = {
        isSubmittingVote: false,
        isRevealingVotes: false,
    };

    submitVote = async (approves) => {
        const { gameId } = this.props;
        const userId = firebase.auth().currentUser.uid;

        try {
            this.setState({
                isSubmittingVote: true,
            });

            await fireFetch(`submitProposedMissionTeamApproval`, {
                gameId,
                userId,
                approves,
            });
        } catch ({ message }) {
            this.setState({
                error: message,
            });
        } finally {
            this.setState({
                isSubmittingVote: false,
            });
        }
    };

    reject = () => this.submitVote(false);

    approve = () => this.submitVote(true);

    revealVotes = async () => {
        const { gameId } = this.props;

        try {
            this.setState({
                isRevealingVotes: true,
            });

            await fireFetch(`revealProposedMissionTeamVote`, {
                gameId,
            });
        } catch ({ message }) {
            this.setState({
                error: message,
            });
        }
    };

    render() {
        const { proposedTeamMembers = [], isHost, votingComplete, submittedVote } = this.props;
        const { isSubmittingVote, isRevealingVotes } = this.state;

        const submittedText = submittedVote && (
            <Text>{`Voted submitted! Waiting for others...`}</Text>
        );

        const waitingForOthersText = !votingComplete && (
            <Text>{`Waiting for others...`}</Text>
        );

        const approveButton = !submittedVote && (
            <ActionButton
                onPress={this.approve}
                isLoading={isSubmittingVote}
                disabled={isSubmittingVote}
            >{`Approve`}</ActionButton>
        );

        const rejectButton = !submittedVote && (
            <ActionButton
                onPress={this.reject}
                isLoading={isSubmittingVote}
                disabled={isSubmittingVote}
            >{`Reject`}</ActionButton>
        );


        const revealVotesButton =
            submittedVote &&
            isHost &&
            votingComplete && (
                <ActionButton
                    onPress={this.revealVotes}
                    isLoading={isRevealingVotes}
                    disabled={isRevealingVotes}
                >{`Reveal Outcome`}</ActionButton>
            );

        return (
            <View style={styles.container}>
                {proposedTeamMembers.map(({ name, id }, i) => {
                    return (
                        <View key={id}>
                            <Text>{`${i + 1}. ${name}`}</Text>
                        </View>
                    );
                })}
                {submittedText}
                {waitingForOthersText}
                {approveButton}
                {rejectButton}
                {revealVotesButton}
            </View>
        );
    }
}

export default MissionTeamVote;
