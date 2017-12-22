import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Text } from 'components/index';

import { Image, View } from 'react-native';
import styles from './MissionLeader.styles';

const missionLeaderIcon = require(`../../../../../assets/images/mission-leader-icon.png`);

class MissionLeader extends Component {
    static propTypes = {
        leader: PropTypes.string.isRequired,
    };

    render() {
        const { leader } = this.props;

        return (
            <View style={styles.container}>
                <Image source={missionLeaderIcon} style={styles.icon} />
                <Text style={styles.leader}>{leader}</Text>
                <Text style={styles.title}>MISSION LEADER</Text>
            </View>
        );
    }
}

export default MissionLeader;
