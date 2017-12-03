import React, {
    PureComponent,
} from 'react';

import {
    View,
    Switch as RNSwitch,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    Text,
} from '/components';

import {
    green,
} from '/styles';

import styles from './Switch.styles';

export default class Switch extends PureComponent {
    static propTypes = {
        children: PropTypes.string.isRequired,
    };

    render() {
        const { children, ...rest } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.label}>{children}</Text>
                <RNSwitch
                    onTintColor={green}
                    {...rest}
                />
            </View>
        );
    }
}
