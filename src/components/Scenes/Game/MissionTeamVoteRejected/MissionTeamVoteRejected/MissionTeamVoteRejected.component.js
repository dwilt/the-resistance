import React, { PureComponent } from 'react';

import { View } from 'react-native';

import { Text, SelectNewLeaderButton, GameFooter } from 'components';

import styles from './MissionTeamVoteRejected.styles';

export default class MissionTeamVoteRejected extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text>{`Mission team rejected!`}</Text>
                    <SelectNewLeaderButton />
                </View>
                <GameFooter />
            </View>
        );
    }
}
