import React, {
    PureComponent,
} from 'react';

import moment from 'moment';

import {
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    TIME_FILTER_SIX_MONTHS,
    TIME_FILTER_MONTH,
    TIME_FILTER_WEEK,
    TIME_FILTER_DAY,
} from '/store/myWater/myWater.actions';

import {
    Text,
} from '/components';

import styles from './MyWaterChartDateRange.styles';

export default class MyWaterChartDateRange extends PureComponent {
    static propTypes = {
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        timeFilter: PropTypes.oneOf([
            TIME_FILTER_SIX_MONTHS,
            TIME_FILTER_MONTH,
            TIME_FILTER_WEEK,
            TIME_FILTER_DAY,
        ]),
    };

    render() {
        const { startDate, endDate, timeFilter } = this.props;

        const dateFormat = `MMM D, YYYY`;
        const formattedStartDate = moment.utc(startDate).format(dateFormat);
        const formattedEndDate = moment.utc(endDate).format(dateFormat);

        let range = `${formattedStartDate} - ${formattedEndDate}`;

        if (timeFilter === TIME_FILTER_DAY) {
            range = formattedStartDate;
        }

        return (
            <View style={styles.container}>
                <Text style={styles.text}>{range}</Text>
            </View>
        );
    }
}
