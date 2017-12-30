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
        approved: PropTypes.bool.isRequired,
        totalApprovedVotes: PropTypes.number.isRequired,
        totalRejectedVotes: PropTypes.number.isRequired,
    };

    render() {
        const { approved, totalApprovedVotes, totalRejectedVotes } = this.props;

        const title = approved
            ? `Mission team approved!`
            : `Mission team rejected!`;

        const actionButton = approved ? (
            <ConductMissionButton />
        ) : (
            <SelectNewLeaderButton />
        );

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Text>{`Approved Votes: ${totalApprovedVotes}`}</Text>
                    <Text>{`Rejected Votes: ${totalRejectedVotes}`}</Text>
                    {actionButton}
                </View>
                <GameFooter />
            </View>
        );
    }
}
