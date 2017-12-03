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

import styles from './MyWaterChartOverlayUsage.styles';

export default class MyWaterChartOverlayUsage extends PureComponent {
    static propTypes = {
        usage: PropTypes.number.isRequired,
    };

    render() {
        const { usage } = this.props;

        const formattedUsage = numberWithCommas(Math.round(usage));

        return (
            <Text>
                {getLocalizedString(`myWater.overlay.usage`)}
                <Text style={styles.usageValue}>{`${formattedUsage} gal.`}</Text>
            </Text>
        );
    }
}
