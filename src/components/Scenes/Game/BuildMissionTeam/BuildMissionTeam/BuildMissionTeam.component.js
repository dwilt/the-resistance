import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { View } from 'react-native';

import {
    BuildMissionTeamPlayersList,
    ConfirmMissionTeamButton,
    GameFooter,
    Text,
    PlayerIdentityReveal,
} from 'components';

import styles from './BuildMissionTeam.styles';

import { getMissionMembersCount } from 'src/gameStructure';

export default class BuildMissionTeam extends Component {
    static propTypes = {
        allPlayersConfirmedIdentity: PropTypes.bool.isRequired,
        isLeader: PropTypes.bool.isRequired,
        roundCount: PropTypes.number.isRequired,
        players: PropTypes.array.isRequired,
    };

    static defaultProps = {
        allPlayersConfirmedIdentity: false,
    };

    render() {
        const {
            isLeader,
            players,
            roundCount,
            allPlayersConfirmedIdentity,
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
                {`Mission leader is selecting `}
                {membersCount}
                {` players to send on mission`}
            </Text>
        );

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>{`Build Mission Team`}</Text>
                    {subtitle}
                    <BuildMissionTeamPlayersList />
                    {isLeader && (
                        <View style={styles.confirmButton}>
                            <ConfirmMissionTeamButton />
                        </View>
                    )}
                </View>
                <GameFooter />
                {!allPlayersConfirmedIdentity && (
                    <View style={styles.identityOverlay}>
                        <PlayerIdentityReveal />
                    </View>
                )}
            </View>
        );
    }
}
