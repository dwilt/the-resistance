import React, { PureComponent } from 'react';

import {
    ConductMissionButton,
    Text,
    GameFooter,
    SelectNewLeaderButton,
    RejectMissionTeamCard,
    ApproveMissionTeamCard,
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
        const {
            approved,
            totalApprovedVotes,
            totalRejectedVotes,
            isHost,
        } = this.props;

        let subtitleText = null;

        if (!isHost) {
            subtitleText = approved
                ? `Host will start mission phase`
                : `Waiting for host`;
        }

        const subtitle = subtitleText && (
            <Text style={styles.subtitle}>{subtitleText}</Text>
        );

        const resultTitle = approved ? `approved` : `rejected`;

        const conductMissionButton = approved &&
            isHost && <ConductMissionButton />;

        const startNextRoundButton = !approved &&
            isHost && <SelectNewLeaderButton />;

        const approvedNumberStyles = [styles.voteNumber];
        const rejectedNumberStyles = [styles.voteNumber];

        if (approved) {
            approvedNumberStyles.push(styles.majorityVoteNumber);
        } else {
            rejectedNumberStyles.push(styles.majorityVoteNumber);
        }

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>{`Mission Team Result`}</Text>
                    {subtitle}
                    <View style={styles.innerContent}>
                        <Text style={styles.resultTitle}>
                            {resultTitle.toUpperCase()}
                        </Text>
                        <View style={styles.cards}>
                            <View style={styles.firstCard}>
                                <ApproveMissionTeamCard />
                                <Text style={approvedNumberStyles}>
                                    {totalApprovedVotes}
                                </Text>
                            </View>
                            <View>
                                <RejectMissionTeamCard />
                                <Text style={rejectedNumberStyles}>
                                    {totalRejectedVotes}
                                </Text>
                            </View>
                        </View>
                        {conductMissionButton}
                        {startNextRoundButton}
                    </View>
                </View>
                <GameFooter />
            </View>
        );
    }
}
