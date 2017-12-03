import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import moment from 'moment';

import {
    TouchableOpacity,
    View,
} from 'react-native';

import {
    TIME_FILTER_DAY,
    TIME_FILTER_WEEK,
    TIME_FILTER_MONTH,
    TIME_FILTER_SIX_MONTHS,
} from '/store/myWater/myWater.actions';

import {
    ChevronIcon,
} from '/components';

import styles, {
    arrowSize,
} from './DateRangeIncrementButton.styles';

export default class DateRangeIncrementButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        endDate: PropTypes.string.isRequired,
        timeFilter: PropTypes.oneOf([
            TIME_FILTER_MONTH,
            TIME_FILTER_DAY,
            TIME_FILTER_WEEK,
            TIME_FILTER_SIX_MONTHS,
        ]),
    };

    render() {
        const { timeFilter, endDate } = this.props;
        const containerStyles = [];
        const endDateIsToday = moment.utc().diff(endDate, `days`) === 0;
        const endDateEndOfMonth = moment.utc(endDate).endOf(`month`);
        const endOfPreviousMonth = moment.utc().subtract(1, `months`).endOf(`month`);
        const daysDifference = moment.utc(endDateEndOfMonth).diff(endOfPreviousMonth, `days`);
        const disabled = endDateIsToday || (timeFilter === TIME_FILTER_SIX_MONTHS && daysDifference === 0);

        if (disabled) {
            containerStyles.push(styles.disabledContainer);
        }

        return (
            <View style={containerStyles}>
                <TouchableOpacity
                    {...this.props}
                    style={styles.button}
                    disabled={disabled}
                >
                    <ChevronIcon
                        size={arrowSize}
                        direction={`right`}
                    />
                </TouchableOpacity>
            </View>

        );
    }
}
