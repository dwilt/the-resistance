import React, { Component } from "react";

import { MissionLeader, RoundCount } from "components/index";

import { View } from "react-native";

import styles from "./GameFooter.styles";

export default class GameFooter extends Component {
    render() {
        return (
            <View style={styles.container}>
                <MissionLeader />
                <RoundCount />
            </View>
        );
    }
}
