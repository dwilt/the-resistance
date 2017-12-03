import React, {
    PureComponent,
} from 'react';

import {
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    Text,
    SimilarHouseholdsUsage,
    YourHouseholdUsage,
    EfficientHouseholdsUsage,
    UsageOverview,
} from '/components';

import {
    getLocalizedString,
} from '/services/locale.service';

import {
    states,
} from '/store/myWater/myWater.actions';

import styles from './UsageComparison.styles';

export default class UsageComparison extends PureComponent {
    static propTypes = {
        state: PropTypes.oneOf(
            Object.keys(states).map(key => states[key])
        ).isRequired,
    };

    render() {
        const { state } = this.props;
        const show = state === states.results;

        return show ? (
            <View>
                <Text style={styles.title}>{getLocalizedString(`myWater.comparison.title`)}</Text>
                <YourHouseholdUsage/>
                <EfficientHouseholdsUsage/>
                <SimilarHouseholdsUsage/>
                <UsageOverview/>
            </View>
        ) : null;
    }
}
