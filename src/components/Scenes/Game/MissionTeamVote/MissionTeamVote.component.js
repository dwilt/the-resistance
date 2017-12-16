import React, { Component } from "react";

import PropTypes from "prop-types";

import { ActionButton } from "../../../Core/ActionButton";

import { firebase, fireFetch } from "/services";
import { View } from "react-native";
import { Text } from "../../../Core/Text";
import styles from "./MissionTeamVote.styles";

class MissionTeamVote extends Component {
    static propTypes = {
        votingComplete: PropTypes.bool.isRequired,
        isHost: PropTypes.bool.isRequired,
        gameId: PropTypes.string.isRequired,
        proposedTeamMembers: PropTypes.arrayOf({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        }).isRequired
    };

    state = {
        submitted: false,
        isSubmittingVote: false,
        isRevealingVotes: false
    };

    submitVote = async approves => {
        const { gameId } = this.props;
        const userId = firebase.auth().currentUser.uid;

        try {
            this.setState({
                isSubmittingVote: true
            });

            await fireFetch(`submitProposedMissionTeamApproval`, {
                gameId,
                userId,
                approves
            });

            this.setState({
                submitted: true
            });
        } catch ({ message }) {
            this.setState({
                error: message
            });
        } finally {
            this.setState({
                isSubmittingVote: false
            });
        }
    };

    reject = () => this.submitVote(false);

    approve = () => this.submitVote(false);

    revealVotes = async () => {
        const { gameId } = this.props;

        try {
            this.setState({
                isRevealingVotes: true
            });

            await fireFetch(`revealProposedMissionTeamVote`, {
                gameId
            });
        } catch ({ message }) {
            this.setState({
                error: message
            });
        }
    };

    render() {
        const { proposedTeamMembers = [], isHost, votingComplete } = this.props;
        const { isSubmittingVote, submitted, isRevealingVotes } = this.state;

        const submittedText = submitted && (
            <Text>{`Voted submitted! Waiting for others...`}</Text>
        );

        const approveButton = !submitted && (
            <ActionButton
                onPress={this.approve}
                isLoading={isSubmittingVote}
                disabled={isSubmittingVote}
            >{`Approve`}</ActionButton>
        );

        const rejectButton = !submitted && (
            <ActionButton
                onPress={this.reject}
                isLoading={isSubmittingVote}
                disabled={isSubmittingVote}
            >{`Reject`}</ActionButton>
        );

        const revealVotesButton =
            submitted &&
            isHost &&
            votingComplete(
                <ActionButton
                    onPress={this.revealVotes}
                    isLoading={isRevealingVotes}
                    disabled={isRevealingVotes}
                >{`Reveal Votes`}</ActionButton>
            );

        return (
            <View style={styles.container}>
                {proposedTeamMembers.map(({ name, id }) => {
                    return (
                        <View key={id}>
                            <Text>{`${i + 1}. ${name}`}</Text>
                        </View>
                    );
                })}
                {submittedText}
                {approveButton}
                {rejectButton}
                {revealVotesButton}
            </View>
        );
    }
}

export default MissionTeamVote;
