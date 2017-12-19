import React, { Component } from "react";

import PropTypes from "prop-types";

import { Text } from "components";

import { Switch, View } from "react-native";
import styles from "./MissionMembersList.styles";

class MissionMembersList extends Component {
    static propTypes = {
        isSyncing: PropTypes.bool.isRequired,
        filled: PropTypes.bool.isRequired,
        isLeader: PropTypes.bool.isRequired,
        players: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })).isRequired,
        onPlayerSelectChange: PropTypes.func.isRequired,
    };

    render() {
        const { players, isSyncing, filled, isLeader, onPlayerSelectChange } = this.props;

        const playersStyles = [styles.players];

        if (isLeader) {
            playersStyles.push(styles.wrapPlayers);
        }

        return (
            <View style={playersStyles}>
                {players.map(({ name, id, selected }) => {
                    const disabled = isSyncing || (filled && !selected);
                    const selectedText = selected &&
                        !isLeader && <Text>{`(selected)`}</Text>;
                    const playerNameStyles = [styles.playerName];

                    if (selected) {
                        playerNameStyles.push(styles.boldName);
                    }

                    return (
                        <View style={styles.player} key={id}>
                            {isLeader ? (
                                <View style={styles.switchContainer}>
                                    <Switch
                                        disabled={disabled}
                                        value={selected}
                                        onValueChange={(value) =>
                                            onPlayerSelectChange(
                                                id,
                                                value,
                                            )
                                        }
                                    />
                                </View>
                            ) : null}
                            <Text style={playerNameStyles}>{name}</Text>
                            {selectedText}
                        </View>
                    );
                })}
            </View>
        );
    }
}

export default MissionMembersList;
