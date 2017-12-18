import React, { Component } from "react";

import PropTypes from "prop-types";

import { ActionButton, Text } from "/components";

import { fireFetch } from "/services";
import { View } from "react-native";
import styles from "./MissionOutcome.styles";

class MissionOutcome extends Component {
    static propTypes = {
        isHost: PropTypes.bool.isRequired,
        passed: PropTypes.bool.isRequired,
        gameId: PropTypes.string.isRequired,
    };

    state = {
        isStarting: false,
    };

    startNextRound = async () => {
        const { gameId } = this.props;

        try {
            this.setState({
                isStarting: true,
            });

            await fireFetch(`buildNewMissionTeam`, {
                gameId,
            });
        } catch ({ message }) {
            this.setState({
                error: message,
            });
        } finally {
            this.setState({
                isStarting: false,
            });
        }
    };

    render() {
        const { passed, isHost } = this.props;
        const { isStarting } = this.state;

        const startNextRound = isHost && (
            <ActionButton
                onPress={this.startNextRound}
                isLoading={isStarting}
                disabled={isStarting}
            >{`Start the next round`}</ActionButton>
        );

        const message = passed ? (
            <Text>{`Mission passed!`}</Text>
        ) : (
            <Text>{`Mission failed!`}</Text>
        );

        return (
            <View style={styles.container}>
                {message}
                {startNextRound}
            </View>
        );
    }
}

export default MissionOutcome;
