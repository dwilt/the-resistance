import React, { Component } from 'react';

import { View } from 'react-native';

import {
   Text,
    GameFooter
} from 'components';

import styles from './ConductMission.styles';

export default class ConductMission extends Component {


    render() {


        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>{`Vote On Mission Success`}</Text>
                    <Text style={styles.subtitle}>{`Keep This Secret!`}</Text>
                </View>
                <GameFooter/>
            </View>
        );
    }
}
