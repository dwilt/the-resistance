import React, { Component } from "react";

import PropTypes from "prop-types";

import { ActionButton } from "../../../Core/ActionButton";

import { firebase, fireFetch } from "/services";
import { View } from "react-native";
import { Text } from "../../../Core/Text";
import styles from "./MissionTeamVoteOutcome.styles";

class MissionTeamVoteOutcome extends Component {
    static propTypes = {
        isHost: PropTypes.bool.isRequired,
        approved: PropTypes.bool.isRequired,
        gameId: PropTypes.string.isRequired
    };

    state = {
        changingState: false
    };

    nextStep = async () => {
        const { gameId, approved } = this.props;

        try {
            this.setState({
                changingState: true
            });

            const cloudFunction = approved
                ? `conductMission`
                : `buildNewMissionTeam`;

            await fireFetch(cloudFunction, {
                gameId
            });
        } catch ({ message }) {
            this.setState({
                error: message
            });
        } finally {
            this.setState({
                changingState: false
            });
        }
    };

    render() {
        const { approved, isHost } = this.props;
        const { changingState } = this.state;

        const message = approved ? (
            <Text>{`Mission team approved!`}</Text>
        ) : (
            <Text>{`Mission team rejected!`}</Text>
        );

        const nextStepButton = isHost && (
            <ActionButton
                onPress={this.nextStep}
                isLoading={changingState}
                disabled={changingState}
            >
                {approved ? `Conduct Mission` : `Build New Mission Team`}
            </ActionButton>
        );

        return (
            <View style={styles.container}>
                {message}
                {nextStepButton}
            </View>
        );
    }
}

export default MissionTeamVoteOutcome;
