import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { View } from 'react-native';

import styles from './Completed.styles';

import { createCommaSentenceFromArray } from 'helpers';

import { Text, PlayerCard, GameFooter } from 'components';

import { victoryTypes } from 'src/gameStructure';

export default class Completed extends Component {
    static propTypes = {
        victoryType: PropTypes.string.isRequired,
        spies: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            }),
        ).isRequired,
    };

    render() {
        const { victoryType, spies } = this.props;

        const spiesNames = spies.map(({ name }) => name);

        const alliesWon =
            victoryType === victoryTypes.ALLIES_COMPLETED_MISSIONS;

        const winTitle = alliesWon ? `Allies Win!` : `Spies Win!`;

        let title = null;

        switch (victoryType) {
        case victoryTypes.ALLIES_COMPLETED_MISSIONS:
            title = `Mission Passed!`;
            break;

        case victoryTypes.SPIES_COMPLETED_MISSIONS:
            title = `Mission Failed!`;
            break;

        case victoryTypes.SPIES_PREVENTED_MISSION_TEAM:
            title = `5 mission teams rejected!`;
            break;
        }

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>Game Over</Text>
                    <View style={styles.playerCard}>
                        <PlayerCard isSpy={!alliesWon} />
                    </View>
                    <Text style={styles.winTitle}>
                        {winTitle.toUpperCase()}
                    </Text>
                    <Text
                        style={styles.spiesText}
                    >{`Spies: ${createCommaSentenceFromArray(
                            spiesNames,
                        )}`}</Text>
                </View>
                <GameFooter />
            </View>
        );
    }
}
