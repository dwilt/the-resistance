import React, {
    PureComponent,
} from 'react';

import {
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    Text,
} from '/components';

import {
    states,
} from '/store/myWater/myWater.actions';

import {
    getLocalizedString,
} from '/services/locale.service';

import styles from './MyWaterNoDataMessage.styles';

export default class MyWaterNoDataMessage extends PureComponent {
    static propTypes = {
        state: PropTypes.oneOf(
            Object.keys(states).map(key => states[key])
        ).isRequired,
    };

    render() {
        const { state } = this.props;
        const show = state === states.noData;

        return show ? (
            <View style={styles.container}>
                <Text style={styles.text}>{getLocalizedString(`myWater.chart.noData`)}</Text>
            </View>
        ) : null;
    }
}
