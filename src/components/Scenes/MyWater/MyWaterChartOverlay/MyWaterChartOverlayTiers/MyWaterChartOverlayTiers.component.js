import React, {
    PureComponent,
} from 'react';

import {
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    round,
} from 'lodash';

import {
    TIME_FILTER_MONTH,
    TIME_FILTER_DAY,
    TIME_FILTER_WEEK,
    TIME_FILTER_SIX_MONTHS,
} from '/store/myWater/myWater.actions';

import {
    Text,
} from '/components';

import {
    numberWithCommas,
} from '/helpers';

import {
    getTierBackgroundColor,
} from '/components/Scenes/MyWater/MyWaterChart/MyWaterChart.styles';

import {
    getLocalizedString,
} from '/services/locale.service';

import styles from './MyWaterChartOverlayTiers.styles';

export default class MyWaterChartOverlayTiers extends PureComponent {
    static propTypes = {
        rateTiers: PropTypes.array.isRequired,
        timeFilter: PropTypes.oneOf([
            TIME_FILTER_MONTH,
            TIME_FILTER_DAY,
            TIME_FILTER_WEEK,
            TIME_FILTER_SIX_MONTHS,
        ]),
        usage: PropTypes.number.isRequired,
    };

    static defaultProps = {
        rateTiers: [],
    };

    render() {
        const { rateTiers, timeFilter, usage } = this.props;

        if (timeFilter === TIME_FILTER_SIX_MONTHS && rateTiers.length) {
            const applicableTiers = rateTiers.filter(({ gallonRange = [] }) => usage >= gallonRange[0]);
            return (
                <View
                    style={styles.tiers}
                >
                    {applicableTiers.map(({ pricePerGallon, gallonRange = [] }, i) => {
                        const startRange = gallonRange[0];
                        const endRange = gallonRange[1];
                        const rangeSize = endRange - startRange;
                        const backgroundColor = getTierBackgroundColor(i);
                        const rangeUsage = usage > endRange ? Math.round(rangeSize) : Math.round(usage - startRange);
                        const rangeCost = round(rangeUsage * pricePerGallon, 2);
                        const formattedRangeUsage = numberWithCommas(rangeUsage);
                        const formattedRangeCost = numberWithCommas(rangeCost);

                        const tierCostEl = (
                            <Text
                                style={[styles.tierDescription, styles.tierCost]}>{`$${formattedRangeCost}`}</Text>
                        );

                        let description = getLocalizedString(`myWater.overlay.nextGallons`, {
                            gallons: formattedRangeUsage,
                        });

                        if (i === 0) {
                            description = getLocalizedString(`myWater.overlay.firstGallons`, {
                                gallons: formattedRangeUsage,
                            });
                        } else if (i === applicableTiers.length - 1) {
                            description = getLocalizedString(`myWater.overlay.finalGallons`, {
                                gallons: formattedRangeUsage,
                            });
                        }

                        return (
                            <View
                                key={i}
                                style={styles.tier}
                            >
                                <View style={styles.tierContent}>
                                    <View style={[styles.tierKey, { backgroundColor }]}/>
                                    <Text>
                                        <Text style={styles.tierDescription}>{description}</Text>
                                        {tierCostEl}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            );
        } else {
            return null;
        }
    }
}
