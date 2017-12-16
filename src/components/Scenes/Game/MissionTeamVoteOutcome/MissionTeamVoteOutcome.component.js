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

    conductMission = async () => {
        const { gameId } = this.props;

        try {
            this.setState({
                changingState: true
            });

            await fireFetch(`conductMission`, {
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

    buildNewMissionTeam = async () => {
        const { gameId } = this.props;

        try {
            this.setState({
                changingState: true
            });

            await fireFetch(`buildNewMissionTeam`, {
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

        const nextStepButton = approved ? (
            <ActionButton
                onPress={this.conductMission}
                isLoading={changingState}
                disabled={changingState}
            >{`Conduct Mission`}</ActionButton>
        ) : (
            <ActionButton
                onPress={this.buildNewMissionTeam}
                isLoading={changingState}
                disabled={changingState}
            >{`Build New Mission Team`}</ActionButton>
        );

        return (
            <View style={styles.container}>
                {message}
                {isHost ? nextStepButton : null}
            </View>
        );
    }
}

export default MissionTeamVoteOutcome;
