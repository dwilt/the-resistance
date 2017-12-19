import React, { Component } from 'react';

import { Switch } from 'react-native';

import PropTypes from 'prop-types';

import { fireFetch } from 'services';
import { View } from 'react-native';

import { ActionButton, Text, MissionLeader } from 'components';

import styles from './BuildMissionTeam.styles';

class BuildMissionTeam extends Component {
    static propTypes = {
        members: PropTypes.arrayOf(PropTypes.string).isRequired,
        filled: PropTypes.bool.isRequired,
        leader: PropTypes.string.isRequired,
        gameId: PropTypes.string.isRequired,
        isLeader: PropTypes.bool.isRequired,
        players: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            }),
        ).isRequired,
    };

    static defaultProps = {
        isLeader: false,
        filled: false,
        members: [],
    };

    state = {
        members: [],
        isConfirming: false,
    };

    componentDidMount() {
        const { members } = this.props;

        this.setState({
            members,
        });
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

    render() {
        const {
            players,
            isLeader,
            filled,
            members: propsMembers,
            leader,
        } = this.props;

        const { isConfirming, members: stateMembers } = this.state;

        const isSyncing = stateMembers.length !== propsMembers.length;

        const members = isSyncing ? stateMembers : propsMembers;

        const confirmMissionTeamButton = isLeader && (
            <ActionButton
                onPress={this.confirmMissionTeam}
                disabled={!filled || isConfirming || isSyncing}
                isLoading={isConfirming}
            >
                {`Confirm Selected Mission Team`}
            </ActionButton>
        );

        return (
            <View style={styles.container}>
                <MissionLeader leader={leader} />
                {players.map(({ name, id }) => {
                    const selected = members.indexOf(id) !== -1;
                    const disabled = isSyncing || (filled && !selected);
                    const selectedText = selected &&
                        !isLeader && <Text>{`(selected)`}</Text>;

                    return (
                        <View style={styles.player} key={id}>
                            {isLeader ? (
                                <Switch
                                    disabled={disabled}
                                    value={selected}
                                    onValueChange={(value) =>
                                        this.onPlayerSelectedChange(id, value)
                                    }
                                />
                            ) : null}
                            <Text>{name}</Text>
                            {selectedText}
                        </View>
                    );
                })}
                {confirmMissionTeamButton}
            </View>
        );
    }
}

export default BuildMissionTeam;
