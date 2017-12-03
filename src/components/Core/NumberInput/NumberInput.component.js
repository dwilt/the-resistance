import React, {
    PureComponent,
} from 'react';

import {
    TouchableOpacity,
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    Icon,
    Text,
} from '/components';

import styles, {
    buttonIconColor,
    buttonSize,
} from './NumberInput.styles';

export default class NumberInput extends PureComponent {
    static propTypes = {
        onIncrement: PropTypes.func.isRequired,
        onDecrement: PropTypes.func.isRequired,
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        incrementDisabled: PropTypes.bool,
        decrementDisabled: PropTypes.bool,
    };

    static defaultProps = {
        decrementDisabled: false,
        incrementDisabled: false,
    };

    render() {
        const { onDecrement, onIncrement, value, label, decrementDisabled, incrementDisabled } = this.props;

        const decrementButton = !decrementDisabled && (
            <TouchableOpacity
                style={styles.button}
                disabled={decrementDisabled}
                onPress={onDecrement}
            >
                <Icon
                    size={buttonSize}
                    name={`minus`}
                    color={buttonIconColor}
                />
            </TouchableOpacity>
        );

        const incrementButton = !incrementDisabled && (
            <TouchableOpacity
                style={styles.button}
                disabled={incrementDisabled}
                onPress={onIncrement}
            >
                <Icon
                    size={buttonSize}
                    name={`plus`}
                    color={buttonIconColor}
                />
            </TouchableOpacity>
        );

        return (
            <View style={styles.container}>
                <Text style={styles.label}>{label}</Text>
                <View style={styles.inputContainer}>
                    {decrementButton}
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{value}</Text>
                    </View>
                    {incrementButton}
                </View>
            </View>
        );
    }
}
