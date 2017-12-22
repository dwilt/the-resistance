import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { MissionLeader, RoundCount } from 'components/index';

import { View } from 'react-native';
import styles from './GameFooter.styles';

class GameFooter extends Component {
    static propTypes = {
        leader: PropTypes.string.isRequired,
        missionsFailed: PropTypes.number.isRequired,
        missionsPassed: PropTypes.number.isRequired,
        roundCount: PropTypes.number.isRequired,
    };

    render() {
        const {
            leader,
            roundCount,
            missionsFailed,
            missionsPassed,
        } = this.props;

        return (
            <View style={styles.container}>
                <MissionLeader leader={leader} />
                <RoundCount
                    missionsFailed={missionsFailed}
                    missionsPassed={missionsPassed}
                    roundCount={roundCount}
                />
            </View>
        );
    }
}

export default GameFooter;
