import React, {
    PureComponent,
} from 'react';

import {
    TouchableOpacity,
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    MyWaterChartOverlayDate,
    MyWaterChartOverlayGoal,
    MyWaterChartOverlayTiers,
    MyWaterChartOverlayUsage,
} from '/components';

import styles from './MyWaterChartOverlay.styles';

export default class MyWaterChartOverlay extends PureComponent {
    static propTypes = {
        isVisible: PropTypes.bool.isRequired,
        close: PropTypes.func.isRequired,
    };

    render() {
        const { isVisible, close } = this.props;

        return isVisible ? (
            <TouchableOpacity
                style={styles.container}
                onPress={close}
                activeOpacity={100}
            >
                <View
                    style={styles.content}
                >
                    <MyWaterChartOverlayDate/>
                    <MyWaterChartOverlayUsage/>
                    <MyWaterChartOverlayGoal/>
                    <MyWaterChartOverlayTiers/>
                </View>
            </TouchableOpacity>
        ) : null;
    }
}
