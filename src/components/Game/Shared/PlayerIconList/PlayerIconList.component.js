import React, { PureComponent } from "react";

import { Image, View } from "react-native";

import PropTypes from "prop-types";

import { Text } from "components";

const userIcon = require(`assets/images/user-icon.png`);

import styles from "./PlayerIconList.styles";

export default class PlayerIconList extends PureComponent {
    static propTypes = {
        players: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            })
        ),
    };

    static defaultProps = {
        players: [],
    };

    render() {
        const { players } = this.props;

        return (
            <View style={styles.container}>
                {players.map(({ id, name }, i) => {
                    const playerContainerStyles = [styles.playerContainer];

                    if (i === 0) {
                        playerContainerStyles.push(styles.firstPlayerContainer);
                    }

                    if (players.length > 2) {
                        if (
                            i === 1 ||
                            (i === 2 && players.length === 4) ||
                            (i === 3 && players.length === 5)
                        ) {
                            playerContainerStyles.push(
                                styles.offsetPlayerContainer
                            );
                        }
                    }

                    return (
                        <View key={id} style={playerContainerStyles}>
                            <Image style={styles.icon} source={userIcon} />
                            <View>
                                <Text style={styles.name}>{name}</Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        );
    }
}
