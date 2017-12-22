import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { fireFetch } from 'services';
import { View } from 'react-native';

import { sortBy } from 'lodash/collection';

import {
    ActionButton,
    Text,
    MissionLeader,
    ProposedMissionMembersList,
    PlayerIdentityReveal,
} from 'components';

import styles from './BuildMissionTeam.styles';

import { getMissionMembersCount } from '../../../../../../firebaseFunctions/gameStructure';

class BuildMissionTeam extends Component {
    static propTypes = {
        members: PropTypes.arrayOf(PropTypes.string).isRequired,
        allPlayersConfirmedIdentity: PropTypes.bool.isRequired,
        filled: PropTypes.bool.isRequired,
        confirmedIdentity: PropTypes.bool.isRequired,
        isLeader: PropTypes.bool.isRequired,
        isSpy: PropTypes.bool.isRequired,
        leader: PropTypes.string.isRequired,
        roundNumber: PropTypes.number.isRequired,
        gameId: PropTypes.string.isRequired,
        players: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            }),
        ).isRequired,
        spies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    };

    static defaultProps = {
        confirmedIdentity: false,
        isLeader: false,
        filled: false,
        members: [],
    };

    state = {
        members: [],
        isConfirming: false,
        showPlayerIdentityReveal: false,
    };

    componentDidMount() {
        const { members, allPlayersConfirmedIdentity } = this.props;

        this.setState({
            members,
            showPlayerIdentityReveal: !allPlayersConfirmedIdentity,
        });
    }

    componentWillReceiveProps({ allPlayersConfirmedIdentity }) {
        if (!allPlayersConfirmedIdentity) {
            this.setState({
                showPlayerIdentityReveal: true,
            });
        }
    }

    onPlayerSelectedChange = async (userId, selected) => {
        const { members, gameId } = this.props;

        try {
            this.setState({
                members: selected
                    ? [...members, userId]
                    : members.filter(
                          (missionMemberId) => missionMemberId !== userId,
                      ),
            });

            const cloudFunction = selected
                ? `addPlayerToMissionTeam`
                : `removePlayerFromMissionTeam`;

            await fireFetch(cloudFunction, {
                gameId,
                userId,
            });
        } catch (e) {
        } finally {
            this.setState({});
        }
    };

    confirmMissionTeam = async () => {
        const { gameId } = this.props;

        try {
            this.setState({
                isConfirming: true,
            });

            await fireFetch(`confirmSelectedMissionTeam`, {
                gameId,
            });
        } catch ({ message }) {
            this.setState({
                error: message,
            });
        } finally {
            this.setState({
                isConfirming: false,
            });
        }
    };

    hidePlayerIdentityOverlay = () =>
        this.setState({
            showPlayerIdentityReveal: false,
        });

    render() {
        const {
            players,
            isLeader,
            filled,
            members: propsMembers,
            leader,
            roundNumber,
            gameId,
            isSpy,
            spies,
        } = this.props;

        const {
            isConfirming,
            members: stateMembers,
            showPlayerIdentityReveal,
        } = this.state;

        const isSyncing = stateMembers.length !== propsMembers.length;

        const members = isSyncing ? stateMembers : propsMembers;

        const selectedPlayers = players.map((player) => ({
            ...player,
            selected: members.indexOf(player.id) !== -1,
        }));
        const sortedPlayers = sortBy(
            selectedPlayers,
            ({ selected }) => !selected,
        );

        const confirmMissionTeamButton = isLeader && (
            <ActionButton
                onPress={this.confirmMissionTeam}
                disabled={!filled || isConfirming || isSyncing}
                isLoading={isConfirming}
            >
                {`Confirm Selected Mission Team`}
            </ActionButton>
        );

        const leaderInstructions = isLeader && (
            <View style={styles.leaderInstructionsContainer}>
                <Text style={styles.leaderInstructionsTextContainer}>
                    <Text style={styles.leaderInstructions}>{`Select `}</Text>
                    <Text
                        style={[
                            styles.leaderInstructions,
                            styles.missionMembersCount,
                        ]}
                    >
                        {getMissionMembersCount(roundNumber, players.length)}
                    </Text>
                    <Text
                        style={styles.leaderInstructions}
                    >{` players to send on this mission`}</Text>
                </Text>
            </View>
        );

        const playerInstructions = !isLeader && (
            <View style={styles.leaderInstructionsContainer}>
                <Text style={styles.leaderInstructionsTextContainer}>
                    <Text
                        style={styles.leaderInstructions}
                    >{`Waiting for ${leader} to choose `}</Text>
                    <Text
                        style={[
                            styles.leaderInstructions,
                            styles.missionMembersCount,
                        ]}
                    >
                        {getMissionMembersCount(roundNumber, players.length)}
                    </Text>
                    <Text
                        style={styles.leaderInstructions}
                    >{` players to send on this mission`}</Text>
                </Text>
            </View>
        );

        const identityOverlay = showPlayerIdentityReveal && (
            <View style={styles.playerIdentityReveal}>
                <PlayerIdentityReveal
                    gameId={gameId}
                    isSpy={isSpy}
                    spies={spies}
                    onConfirmIdentity={this.hidePlayerIdentityOverlay}
                />
            </View>
        );

        return (
            <View style={styles.container}>
                {leaderInstructions}
                {playerInstructions}
                <ProposedMissionMembersList
                    filled={filled}
                    isSyncing={isSyncing}
                    isLeader={isLeader}
                    onPlayerSelectChange={this.onPlayerSelectedChange}
                    players={isLeader ? selectedPlayers : sortedPlayers}
                />
                {confirmMissionTeamButton}
                {identityOverlay}
            </View>
        );
    }
}

export default BuildMissionTeam;
