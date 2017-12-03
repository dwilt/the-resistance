import React, {
    PureComponent,
} from 'react';

import {
    DateRangeDecrementButton,
    DateRangeIncrementButton,
    MyWaterActivityIndicator,
    MyWaterChart,
    MyWaterChartFilters,
    MyWaterChartDateRange,
    MyWaterChartOverlay,
    MyWaterNoDataMessage,
    Scene,
    UsageComparison,
} from '/components';

import {
    getLocalizedString,
} from '/services/locale.service';

import {
    View,
} from 'react-native';

import styles from './MyWater.styles';

export default class MyWater extends PureComponent {
    render() {
        return (
            <Scene
                title={getLocalizedString(`myWater.title`)}
                subheader={<MyWaterChartFilters/>}
                style={styles.container}
            >
                <View style={styles.chartContainer}>
                    <View style={styles.timeFilter}>
                        <DateRangeDecrementButton/>
                        <MyWaterChartDateRange/>
                        <DateRangeIncrementButton/>
                    </View>
                    <View style={styles.chart}>
                        <MyWaterActivityIndicator/>
                        <MyWaterNoDataMessage/>
                        <MyWaterChart/>
                    </View>
                    <View style={styles.comparison}>
                        <UsageComparison/>
                    </View>
                    <MyWaterChartOverlay/>
                </View>
            </Scene>
        );
    }
}
