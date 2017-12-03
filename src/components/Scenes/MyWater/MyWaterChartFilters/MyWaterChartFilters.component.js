import React, {
    PureComponent,
} from 'react';

import {
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    Tabs,
} from '/components';

import {
    TIME_FILTER_DAY,
    TIME_FILTER_MONTH,
    TIME_FILTER_SIX_MONTHS,
    TIME_FILTER_WEEK,
} from '/store/myWater/myWater.actions';

import {
   getLocalizedString,
} from '/services/locale.service';

import styles from './MyWaterChartFilters.styles';

export default class MyWaterChartFilters extends PureComponent {
    static propTypes = {
        activeFilter: PropTypes.string.isRequired,
        onFilterPress: PropTypes.func.isRequired,
        measurementInterval: PropTypes.oneOf([
            `hour`,
            `day`,
            `week`,
            `month`,
            `bi_monthly`,
        ]),
    };

    getTabs = () => {
        const { measurementInterval, onFilterPress } = this.props;
        const tabs = [
            {
                id: TIME_FILTER_SIX_MONTHS,
                onPress: () => onFilterPress(TIME_FILTER_SIX_MONTHS),
                label: getLocalizedString(`myWater.filters.sixMonths`),
            },
        ];

        if (
            measurementInterval === `hour` ||
            measurementInterval === `day` ||
            measurementInterval === `week`
        ) {
            tabs.push({
                id: TIME_FILTER_MONTH,
                onPress: () => onFilterPress(TIME_FILTER_MONTH),
                label: getLocalizedString(`myWater.filters.month`),
            });
        }

        if (
            measurementInterval === `hour` ||
            measurementInterval === `day`
        ) {
            tabs.push({
                id: TIME_FILTER_WEEK,
                onPress: () => onFilterPress(TIME_FILTER_WEEK),
                label: getLocalizedString(`myWater.filters.week`),
            });
        }

        if (measurementInterval === `hour`) {
            tabs.push({
                id: TIME_FILTER_DAY,
                onPress: () => onFilterPress(TIME_FILTER_DAY),
                label: getLocalizedString(`myWater.filters.day`),
            });
        }

        return tabs;
    };

    render() {
        const { activeFilter } = this.props;

        return (
            <View style={styles.container}>
                <Tabs
                    activeFilter={activeFilter}
                >
                    {this.getTabs()}
                </Tabs>
            </View>
        );
    }
}
