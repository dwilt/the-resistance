import React, {
    PureComponent,
} from 'react';

import {
    numberWithCommas,
} from '/helpers';

import PropTypes from 'prop-types';

import {
    Text,
} from '/components';

import {
   getLocalizedString,
} from '/services/locale.service';

import styles from './MyWaterChartOverlayGoal.styles';

export default class MyWaterChartOverlayGoal extends PureComponent {
    static propTypes = {
        goal: PropTypes.number,
        usage: PropTypes.number.isRequired,
    };

    render() {
        const { goal, usage } = this.props;

        let percentageEl = null;

        if (goal) {
            const percentage = Math.round(Math.abs((usage / goal) - 1) * 100);

            percentageEl = goal >= usage ? (
                <Text style={styles.belowGoalText}>{` (-${numberWithCommas(percentage)}%)`}</Text>
            ) : (
                <Text style={styles.aboveGoalText}>{` (+${numberWithCommas(percentage)}%)`}</Text>
            );

            const formattedGoal = Math.round(goal);

            return (
                <Text style={styles.goal}>
                    {getLocalizedString(`myWater.overlay.goal`)}
                    <Text style={styles.goalValue}>{`${numberWithCommas(formattedGoal)} gal.`}</Text>
                    {percentageEl}
                </Text>
            );
        } else {
            return null;
        }
    }
}
