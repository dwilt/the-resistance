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
    ActionButton,
} from '/components';

import styles from './CompleteSetUpButton.styles';

export default class CompleteSetUpButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
    };

    render() {
        return (
            <View style={styles.container}>
                <ActionButton
                    {...this.props}
                >
                    {getLocalizedString(`completedSetUp.complete`)}
                </ActionButton>
            </View>
        );
    }
}
