import React, {
    PureComponent,
} from 'react';

import {
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    getLocalizedString,
} from '/services/locale.service';

import {
    Text,
} from '/components';

import styles from './UsageOverview.styles';

export default class UsageOverview extends PureComponent {
    static propTypes = {
        count: PropTypes.number,
        radius: PropTypes.number.isRequired,
    };

    render() {
        const { count, radius } = this.props;
        const containerStyles = [styles.container];

        if (!count) {
            containerStyles.push(styles.hiddenContainer);
        }

        return (
            <View style={containerStyles}>
                <Text style={styles.text}>{getLocalizedString(`myWater.comparison.note`, {
                    count,
                    radius,
                })}</Text>
            </View>
        );
    }
}
