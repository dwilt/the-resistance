import React, { PureComponent } from 'react';

import { ConductMissionButton, Text, GameFooter } from 'components/index';

import { View } from 'react-native';

import styles from './MissionTeamVoteApproved.styles';

export default class MissionTeamVoteApproved extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text>{`Mission team approved!`}</Text>
                    <ConductMissionButton />
                </View>
                <GameFooter />
            </View>
        );
    }
}
