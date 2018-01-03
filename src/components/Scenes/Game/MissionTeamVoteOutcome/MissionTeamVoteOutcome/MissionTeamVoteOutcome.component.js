import React, { PureComponent } from 'react';

import {
    ConductMissionButton,
    Text,
    GameFooter,
    SelectNewLeaderButton,
} from 'components/index';

import PropTypes from 'prop-types';

import { View } from 'react-native';

import styles from './MissionTeamVoteOutcome.styles';

export default class MissionTeamVoteOutcome extends PureComponent {
    static propTypes = {
        isHost: PropTypes.bool.isRequired,
        approved: PropTypes.bool.isRequired,
        totalApprovedVotes: PropTypes.number.isRequired,
        totalRejectedVotes: PropTypes.number.isRequired,
    };

    render() {
        const { approved, totalApprovedVotes, totalRejectedVotes, isHost } = this.props;

        const title = approved
            ? `Mission team approved!`
            : `Mission team rejected!`;

        const conductMissionButton = approved && isHost && (
            <ConductMissionButton />
        );

        const startNextRoundButton = !approved && isHost && (
            <SelectNewLeaderButton />
        );

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Text>{`Approved Votes: ${totalApprovedVotes}`}</Text>
                    <Text>{`Rejected Votes: ${totalRejectedVotes}`}</Text>
                    {conductMissionButton}
                    {startNextRoundButton}
                </View>
                <GameFooter />
            </View>
        );
    }
}
