import React, { Component } from "react";

import PropTypes from "prop-types";

import { Text } from "components";

import { View } from "react-native";
import styles from "./MissionLeader.styles";

class MissionLeader extends Component {
    static propTypes = {
        leader: PropTypes.string.isRequired,
    };

    render() {
        const { leader } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Mission Leader:</Text>
                <Text style={styles.leader}>{leader}</Text>
            </View>
        );
    }
}

export default MissionLeader;
