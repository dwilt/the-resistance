import React, { PureComponent } from "react";

import { View } from "react-native";

import PropTypes from "prop-types";

import { Text } from "components";

import styles from "./StartGameCountdown.styles";

export default class StartGameCountdown extends PureComponent {
    static propTypes = {
        count: PropTypes.number.isRequired,
    };

    render() {
        const { count } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Game starts in:</Text>
                <Text style={styles.count}>{count}</Text>
            </View>
        );
    }
}
