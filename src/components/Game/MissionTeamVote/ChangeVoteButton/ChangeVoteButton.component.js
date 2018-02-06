import React, { PureComponent } from "react";

import { TouchableOpacity, View } from "react-native";

import PropTypes from "prop-types";

import { Text } from "components";

import styles from "./ChangeVoteButton.styles";

export default class ChangeVoteButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
    };

    render() {
        return (
            <TouchableOpacity {...this.props} style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Change Vote</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
