import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    Icon,
    Text,
} from '/components';

import {
    TextInput as RNTextInput,
    TouchableOpacity,
    ViewPropTypes,
    View,
} from 'react-native';

import styles, {
    toggleIconSize,
    toggleIconColor,
} from './TextInput.styles';

export default class TextInput extends PureComponent {

    static propTypes = {
        autoFocus: PropTypes.bool.isRequired,
        multiline: PropTypes.bool.isRequired,
        style: ViewPropTypes.style,
        inputStyle: ViewPropTypes.style,
        label: PropTypes.string,
        onMount: PropTypes.func,
        secureTextEntry: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        autoFocus: false,
        editable: true,
        multiline: false,
        style: {},
        inputStyle: {},
        label: null,
        secureTextEntry: false,
    };

    constructor(props) {
        super(props);

        this.state = {
            showPassword: !props.secureTextEntry,
        };
    }

    toggleShowPassword = () => {
        this.setState((previousState) => ({
            showPassword: !previousState.showPassword,
        }));
    };

    inputRef = input => {
        const { autoFocus } = this.props;

        if (autoFocus && input) {
            input.focus();
        }
    };

    componentDidMount() {
        const { onMount } = this.props;

        if (onMount) {
            onMount();
        }
    }

    render() {
        const { style, multiline, label, inputStyle, secureTextEntry } = this.props;
        const { showPassword } = this.state;

        const inputStyles = [styles.input];
        const labelEl = label && (
            <Text style={styles.label}>{label}</Text>
        );

        if (multiline) {
            inputStyles.push(styles.multilineInput);
        }

        inputStyles.push(inputStyle);

        const passwordToggle = secureTextEntry && (
            <TouchableOpacity
                onPress={this.toggleShowPassword}
                style={styles.passwordToggle}
            >
                <Icon
                    name={showPassword ? `eye-crossed` : `eye`}
                    size={toggleIconSize}
                    color={toggleIconColor}
                />
            </TouchableOpacity>
        );

        return (
            <View style={[styles.container, style]}>
                {labelEl}
                <View style={styles.textContainer}>
                    <RNTextInput
                        {...this.props}
                        secureTextEntry={!showPassword}
                        ref={this.inputRef}
                        underlineColorAndroid={`transparent`}
                        style={inputStyles}
                    />
                    {passwordToggle}
                </View>
            </View>
        );
    }
}
