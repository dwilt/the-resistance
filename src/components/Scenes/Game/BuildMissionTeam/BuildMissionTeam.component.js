import React, { Component } from 'react';

import { Switch } from 'react-native';

import PropTypes from 'prop-types';

import { ActionButton } from '../../../Core/ActionButton';

import { fireFetch } from '/services';
import { View } from 'react-native';
import { Text } from '../../../Core/Text';
import styles from './BuildMissionTeam.styles';
import { getMissionMembersCount } from '../../../../../assets/gameStructure';

class BuildMissionTeam extends Component {
    static propTypes = {
        roundNumber: PropTypes.number.isRequired,
        gameId: PropTypes.string.isRequired,
        isHost: PropTypes.bool.isRequired,
        players: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            }),
        ).isRequired,
    };

    static defaultProps = {
        isHost: false,
    };

    state = {
        isConfirming: false,
        missionTeamFilled: false,
        missionTeamIds: [],
    };

    onPlayerSelectedChange = (id, selected) => {
        const { roundNumber, players } = this.props;
        const { missionTeamIds } = this.state;

        const newMissionIds = selected
            ? [...missionTeamIds, id]
            : missionTeamIds.filter(playerId => playerId !== id);

        const totalTeamCount = getMissionMembersCount(
            roundNumber,
            players.length,
        );

        this.setState({
            missionTeamIds: newMissionIds,
            missionTeamFilled: newMissionIds.length === totalTeamCount,
        });
    };

    setMissionTeam = async () => {
        const { gameId } = this.props;
        const { missionTeamIds } = this.state;

        try {
            this.setState({
                isConfirming: true,
            });

            await fireFetch(`setMissionTeam`, {
                missionTeamIds,
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
        const { players, isHost } = this.props;
        const { missionTeamFilled, missionTeamIds, isConfirming } = this.state;

        return (
            <View style={styles.container}>
                {players.map(({ name, id }, i) => {
                    const selected = missionTeamIds.indexOf(id) !== -1;

                    return (
                        <View key={id}>
                            {isHost ? (
                                <Switch
                                    disabled={missionTeamFilled && !selected}
                                    value={selected}
                                    onValueChange={value =>
                                        this.onPlayerSelectedChange(id, value)
                                    }
                                />
                            ) : null}
                            <Text>{`${i + 1}. ${name}`}</Text>
                        </View>
                    );
                })}
                <ActionButton
                    onPress={this.setMissionTeam}
                    disabled={!missionTeamFilled}
                    isLoading={isConfirming}
                >
                    {`Confirm Selected Mission Team`}
                </ActionButton>
            </View>
        );
    }
}

export default BuildMissionTeam;
