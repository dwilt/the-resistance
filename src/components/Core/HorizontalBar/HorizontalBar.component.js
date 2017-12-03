import React, {
    PureComponent,
} from 'react';

import {
    View,
} from 'react-native';

import {
    numberWithCommas,
} from '/helpers';

import PropTypes from 'prop-types';

import {
    Text,
} from '/components';

import styles, {
    maxBarWidth,
    barColor,
} from './HorizontalBar.styles';

export default class HorizontalBar extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
    };

    static defaultProps = {
        width: 0,
        value: 0,
        color: barColor,
    };

    render() {
        const { title, value, color, width } = this.props;
        const formattedValue = numberWithCommas(Math.round(value));
        const barWidth = Math.round(maxBarWidth * width);

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {title}
                    <Text style={styles.value}>{` (${formattedValue} gal.)`}</Text>
                </Text>
                <View style={styles.barContainer}>
                    <View style={[styles.bar, {
                        width: barWidth,
                        backgroundColor: color,
                    }]}/>
                </View>
            </View>
        );
    }
}
