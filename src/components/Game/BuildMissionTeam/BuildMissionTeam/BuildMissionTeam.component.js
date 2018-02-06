import React, { Component } from "react";

import PropTypes from "prop-types";

import { View } from "react-native";

import {
    BuildMissionTeamPlayersList,
    ConfirmMissionTeamButton,
    GameFooter,
    Text,
    PlayerIdentityReveal,
} from "components";

import styles from "./BuildMissionTeam.styles";

import { getMissionMembersCount } from "src/gameStructure";

export default class BuildMissionTeam extends Component {
    static propTypes = {
        playerConfirmedIdentity: PropTypes.bool.isRequired,
        isLeader: PropTypes.bool.isRequired,
        roundCount: PropTypes.number.isRequired,
        players: PropTypes.array.isRequired,
        leader: PropTypes.string.isRequired,
    };

    render() {
        const {
            leader,
            isLeader,
            players,
            roundCount,
            playerConfirmedIdentity,
        } = this.props;

        const membersCount = (
            <Text style={styles.missionMembersCount}>
                {getMissionMembersCount(roundCount, players.length)}
            </Text>
        );

        const subtitle = isLeader ? (
            <Text style={styles.subtitle}>
                {`Select any `}
                {membersCount}
                {` players to send on the mission`}
            </Text>
        ) : (
            <Text style={styles.subtitle}>
                {`${leader} is selecting `}
                {membersCount}
                {` players to send on the mission`}
            </Text>
        );

        return (
            <View style={styles.container}>
                {playerConfirmedIdentity && (
                    <View style={styles.content}>
                        <View style={styles.content}>
                            <Text style={styles.title}>Build Mission Team</Text>
                            {subtitle}
                            <BuildMissionTeamPlayersList />
                            {isLeader && (
                                <View style={styles.confirmButton}>
                                    <ConfirmMissionTeamButton />
                                </View>
                            )}
                        </View>
                        <GameFooter />
                    </View>
                )}

                {!playerConfirmedIdentity && <PlayerIdentityReveal />}
            </View>
        );
    }
}
