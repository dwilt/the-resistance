import React, { PureComponent } from 'react';

import { capitalize } from 'lodash';

import {
    ActivityIndicator,
    TouchableOpacity,
    View,
    ViewPropTypes,
} from 'react-native';

import PropTypes from 'prop-types';

import styles from './ActionButton.styles';

import { Text } from 'components';

export default class ActionButton extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired,
        children: PropTypes.node.isRequired,
        disabled: PropTypes.bool,
        theme: PropTypes.oneOf([`yellow`, `teal`, `bordered`]),
        style: ViewPropTypes.style,
    };

    static defaultProps = {
        disabled: false,
        selected: false,
        isLoading: false,
        theme: `yellow`,
        style: {},
    };

    render() {
        const {
            theme,
            onPress,
            children,
            isLoading,
            disabled,
            style,
            selected,
        } = this.props;

        const textStyles = [styles.text];
        const buttonStyles = [styles.textContainer];

        buttonStyles.push(styles[`${theme}Container`]);

        if (selected) {
            buttonStyles.push(styles[`selected${capitalize(theme)}Container`]);
            textStyles.push(styles[`selected${capitalize(theme)}Text`]);
        }

        const isLoadingEl = isLoading && (
            <View style={styles.loader}>
                <ActivityIndicator color={`white`} />
            </View>
        );

        if (isLoading) {
            textStyles.push(styles.hiddenText);
        }

        buttonStyles.push(style);

        return (
            <View style={styles.container}>
                <View style={[disabled && styles.disabled]}>
                    <TouchableOpacity
                        disabled={disabled}
                        onPress={onPress}
                        style={buttonStyles}
                    >
                        <Text style={textStyles}>{children}</Text>
                        {isLoadingEl}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
