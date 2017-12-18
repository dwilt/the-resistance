import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "./Completed.styles";
import { Text } from "components";
import { victoryTypes } from "../../../../../firebaseFunctions/gameStructure";

class Completed extends Component {
    static propTypes = {
        victoryType: PropTypes.string.isRequired,
    };

    render() {
        const { victoryType } = this.props;
        let message = null;

        switch (victoryType) {
            case victoryTypes.ALLIES_COMPLETED_MISSIONS:
                message = `Allies completed their missions!`;
                break;

            case victoryTypes.SPIES_COMPLETED_MISSIONS:
                message = `Spies completed their missions!`;
                break;

            case victoryTypes.SPIES_PREVENTED_MISSION_TEAM:
                message = `Spies prevented a successful mission team!`;
                break;
        }

        return (
            <View style={styles.container}>
                <Text>{message}</Text>
            </View>
        );
    }
}

export default Completed;
