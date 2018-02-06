import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Text } from 'components/index';

import { View } from 'react-native';

import styles from './MissionLeader.styles';

import { gameStates } from 'src/gameStructure';

class MissionLeader extends Component {
    static propTypes = {
        leader: PropTypes.string.isRequired,
        gameState: PropTypes.string.isRequired,
    };

    render() {
        const { leader, gameState } = this.props;
        const show =
            gameState === gameStates.BUILD_MISSION_TEAM ||
            gameState === gameStates.MISSION_TEAM_VOTE;

        return show ? (
            <View style={styles.container}>
                <Text style={styles.leader}>{leader}</Text>
                <Text style={styles.title}>MISSION LEADER</Text>
            </View>
        ) : null;
    }
}

export default MissionLeader;
