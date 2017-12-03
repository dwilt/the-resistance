import React, {
    PureComponent,
} from 'react';

import {
    TIME_FILTER_MONTH,
    TIME_FILTER_DAY,
    TIME_FILTER_WEEK,
    TIME_FILTER_SIX_MONTHS,
} from '/store/myWater/myWater.actions';

import moment from 'moment';

import PropTypes from 'prop-types';

import {
    Text,
} from '/components';

import styles from './MyWaterChartOverlayDate.styles';

export default class MyWaterChartOverlayDate extends PureComponent {
    static propTypes = {
        timeFilter: PropTypes.oneOf([
            TIME_FILTER_MONTH,
            TIME_FILTER_DAY,
            TIME_FILTER_WEEK,
            TIME_FILTER_SIX_MONTHS,
        ]),
        endDate: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
    };

    render() {
        const { timeFilter,endDate,startDate } = this.props;

        let date = null;

        switch (timeFilter) {
            case TIME_FILTER_SIX_MONTHS:
                date = moment.utc(startDate).format(`MMMM, YYYY`);
                break;

            case TIME_FILTER_MONTH: {
                const dateFormat = `MM/DD/YY`;
                const formattedStartDate = moment.utc(startDate).format(dateFormat);
                const formattedEndDate = moment.utc(endDate).format(dateFormat);

                date = `${formattedStartDate} - ${formattedEndDate}`;
                break;
            }

            case TIME_FILTER_WEEK:
                date = moment.utc(startDate).format(`dddd, MMMM DD, YYYY`);
                break;

            case TIME_FILTER_DAY:
                date = moment.utc(startDate).format(`ha on MMMM DD, YYYY`);
                break;

            default:
                break;
        }

        return <Text style={styles.date}>{date}</Text>;
    }
}
