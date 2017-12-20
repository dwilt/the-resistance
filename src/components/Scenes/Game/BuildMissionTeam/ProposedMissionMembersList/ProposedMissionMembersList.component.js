import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Text } from 'components';

import { Switch, View } from 'react-native';
import styles from './ProposedMissionMembersList.styles';

class ProposedMissionMembersList extends Component {
    static propTypes = {
        players: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            }),
        ).isRequired,
        filled: PropTypes.bool.isRequired,
        isLeader: PropTypes.bool.isRequired,
        isSyncing: PropTypes.bool.isRequired,
        onPlayerSelectChange: PropTypes.func.isRequired,
    };

    render() {
        const {
            players,
            isLeader,
            isSyncing,
            onPlayerSelectChange,
            filled,
        } = this.props;

        const playersStyles = [styles.players];

        if (isLeader) {
            playersStyles.push(styles.wrapPlayers);
        }

        return (
            <View style={playersStyles}>
                {players.map(({ name, id, selected }, i) => {
                    const disabled = isSyncing || (filled && !selected);
                    const selectedText = selected &&
                        !isLeader && <Text>{`(selected)`}</Text>;
                    const playerNameStyles = [styles.playerName];

                    if (selected) {
                        playerNameStyles.push(styles.boldName);
                    }

                    const namePrefix = !isLeader ? `${i + 1}. ` : ``;

                    return (
                        <View
                            key={id}
                            style={[styles.player, styles.leaderPlayer]}
                        >
                            {isLeader ? (
                                <View style={styles.switchContainer}>
                                    <Switch
                                        disabled={disabled}
                                        value={selected}
                                        onValueChange={(value) =>
                                            onPlayerSelectChange(id, value)
                                        }
                                    />
                                </View>
                            ) : null}
                            <Text style={playerNameStyles}>
                                {`${namePrefix}${name}`}
                            </Text>
                            {selectedText}
                        </View>
                    );
                })}
            </View>
        );
    }
}

export default ProposedMissionMembersList;
