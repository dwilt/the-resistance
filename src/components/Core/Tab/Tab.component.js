import React, {
    PureComponent,
} from 'react';

import {
    TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    Text,
} from '/components';

import styles from './Tab.styles';

export default class Tab extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        children: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired,
    };

    render() {
        const { onPress, children, active } = this.props;
        const containerStyles = [styles.container];
        const textStyles = [styles.text];

        if (active) {
            containerStyles.push(styles.activeContainer);
            textStyles.push(styles.activeText);
        }

        return (
            <TouchableOpacity
                onPress={onPress}
                style={containerStyles}
            >
                <Text style={textStyles}>
                    {children.toUpperCase()}
                </Text>
            </TouchableOpacity>
        );
    }
}
