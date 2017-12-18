import React, { Component } from "react";

import { Alert } from "react-native";

import PropTypes from "prop-types";

import { ActionButton, Text } from "/components";

import { fireFetch } from "/services";
import { View } from "react-native";
import styles from "./ConductMission.styles";
import { firebase } from "/services";

class ConductMission extends Component {
    static propTypes = {
        gameId: PropTypes.string.isRequired,
        isMember: PropTypes.bool.isRequired,
        voted: PropTypes.bool.isRequired,
        isSpy: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        isMember: false,
        isSpy: false,
    };

    state = {
        isSubmittingVote: false,
        voted: false,
    };

    componentDidMount() {
        const { voted } = this.props;

        this.setState({
            voted,
        });
    }

    componentWillReceiveProps({ voted }) {
        this.setState({
            voted,
        });
    }

    submitVote = async (succeeds) => {
        const { gameId } = this.props;
        const userId = firebase.auth().currentUser.uid;

        try {
            this.setState({
                isSubmittingVote: true,
            });

            await fireFetch(`submitMissionSuccess`, {
                gameId,
                userId,
                succeeds,
            });

            this.setState({
                voted: true,
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

    pass = () => this.submitVote(true);

    fail = async () => {
        const { isSpy } = this.props;

        if (!isSpy) {
            Alert.alert(`No can do!`, `Only spies can fail missions!`);
        } else {
            await this.submitVote(false);
        }
    };

    render() {
        const { isMember, voted: propsVoted } = this.props;
        const { isSubmittingVote, voted: stateVoted } = this.state;
        const voted = propsVoted !== stateVoted ? stateVoted : propsVoted;

        const failButton = !voted &&
            isMember && (
                <ActionButton
                    onPress={this.fail}
                    disabled={isSubmittingVote}
                    isLoading={isSubmittingVote}
                    style={styles.failButton}
                >
                    {`Fail`}
                </ActionButton>
            );

        const succeedButton = !voted &&
            isMember && (
                <ActionButton
                    onPress={this.pass}
                    disabled={isSubmittingVote}
                    isLoading={isSubmittingVote}
                >
                    {`Pass`}
                </ActionButton>
            );

        const nonMemberText = !isMember && (
            <Text>{`Waiting for mission team to vote..`}</Text>
        );

        const votedText = voted && (
            <Text
            >{`Vote received. Waiting for other mission team members to vote.`}</Text>
        );

        return (
            <View style={styles.container}>
                {nonMemberText}
                {failButton}
                {succeedButton}
                {votedText}
            </View>
        );
    }
}

export default ConductMission;
