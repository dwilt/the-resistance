import React, { PureComponent } from 'react';

import {
    ConductMissionButton,
    Text,
    GameFooter,
    SelectNewLeaderButton,
    RejectMissionTeamCard,
    ApproveMissionTeamCard,
    MissionTeamVotePlayersList,
} from 'components';

import PropTypes from 'prop-types';

import { View, Image } from 'react-native';

const approvedStamp = require(`assets/images/mission-team-approved-stamp.png`);
const rejectedStamp = require(`assets/images/mission-team-rejected-stamp.png`);

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

        const stamp = approved ? approvedStamp : rejectedStamp;

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
                    <View style={styles.playersListContainer}>
                        <View style={styles.playersList}>
                            <MissionTeamVotePlayersList />
                        </View>
                        <Image style={styles.stamp} source={stamp} />
                    </View>
                    <View style={styles.cards}>
                        <View style={styles.firstCard}>
                            <ApproveMissionTeamCard width={50} />
                            <Text style={approvedNumberStyles}>
                                {totalApprovedVotes}
                            </Text>
                        </View>
                        <View>
                            <RejectMissionTeamCard width={50} />
                            <Text style={rejectedNumberStyles}>
                                {totalRejectedVotes}
                            </Text>
                        </View>
                    </View>
                    {conductMissionButton}
                    {startNextRoundButton}
                </View>
                <GameFooter />
            </View>
        );
    }
}
