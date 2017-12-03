import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    round,
} from 'lodash';

import moment from 'moment';

import {
    TIME_FILTER_MONTH,
    TIME_FILTER_DAY,
    TIME_FILTER_WEEK,
    TIME_FILTER_SIX_MONTHS,
} from '/store/myWater/myWater.actions';

import {
    BarChart,
} from '/components';

import {
    getLocalizedString,
} from '/services/locale.service';

import {
    getTierBackgroundColor,
    width,
    height,
    goalColor,
} from './MyWaterChart.styles';

import {
    states,
} from '/store/myWater/myWater.actions';

export default class MyWaterChart extends PureComponent {
    static propTypes = {
        state: PropTypes.oneOf(
            Object.keys(states).map(key => states[key])
        ).isRequired,
        getUsage: PropTypes.func.isRequired,
        onBarPress: PropTypes.func.isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
            goal: PropTypes.number,
            usage: PropTypes.number.isRequired,
        })).isRequired,
        timeFilter: PropTypes.oneOf([
            TIME_FILTER_MONTH,
            TIME_FILTER_DAY,
            TIME_FILTER_WEEK,
            TIME_FILTER_SIX_MONTHS,
        ]),
        userInterval: PropTypes.oneOf([
            `hour`,
            `day`,
            `week`,
            `month`,
            `bi_monthly`,
        ]).isRequired,
        rateTiers: PropTypes.array.isRequired,
    };

    static defaultProps = {
        data: [],
        rateTiers: [],
        userInterval: `month`,
    };

    componentDidMount() {
        const { getUsage } = this.props;

        getUsage();
    }

    getLabel = (startDate, endDate) => {
        const { timeFilter, userInterval } = this.props;

        switch (timeFilter) {
            case TIME_FILTER_MONTH: {
                const formattedStartDate = moment.utc(startDate).format(`MM/DD`);
                const formattedEndDate = moment.utc(endDate).format(`MM/DD`);

                return `${formattedStartDate} - ${formattedEndDate}`;
            }

            case TIME_FILTER_WEEK: {
                return moment.utc(startDate).format(`MM/DD`);
            }

            case TIME_FILTER_DAY: {
                return moment.utc(startDate).format(`ha`);
            }

            default: {
                if (
                    userInterval === `month` ||
                    userInterval === `bi_monthly`
                ) {
                    return moment.utc(endDate).format(`MM/DD`);
                } else {
                    return moment.utc(startDate).format(`MMM`);
                }
            }
        }
    };

    formatXAxis = (value) => {
        let formattedValue = value;

        if (value >= 1000 && value < 1000000) {
            formattedValue = value / 1000;

            if (formattedValue < 10) {
                formattedValue = round(formattedValue, 1);
            } else {
                formattedValue = round(formattedValue, 0);
            }

            formattedValue = `${formattedValue}k`;
        }

        return `${formattedValue} gal.`;
    };

    render() {
        const { data, rateTiers, timeFilter, onBarPress, state } = this.props;
        const showChart = state === states.results;

        if (showChart) {
            const steps = timeFilter === TIME_FILTER_SIX_MONTHS && rateTiers.length ? rateTiers.map(({ gallonRange = [] }, i) => ({
                start: gallonRange[0],
                end: gallonRange[1],
                backgroundColor: getTierBackgroundColor(i),
            })) : [];

            const line = data[0] && typeof data[0].goal !== `undefined` ? data.map(({ goal }) => Math.round(goal)) : [];

            return (
                <BarChart
                    data={data.map(({ startDate, endDate, usage }, i) => ({
                        value: Math.round(usage),
                        label: this.getLabel(startDate, endDate, i),
                    }))}
                    width={width}
                    height={height}
                    xAxisFormatter={this.formatXAxis}
                    steps={steps}
                    onBarPress={onBarPress}
                    maxLineColor={goalColor}
                    line={line}
                    lineLabel={getLocalizedString(`myWater.chart.goal`)}
                />
            );
        } else {
            return null;
        }
    }
}
