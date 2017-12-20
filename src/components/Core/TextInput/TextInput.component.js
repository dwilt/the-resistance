import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { Text } from 'components';

import { TextInput as RNTextInput, ViewPropTypes, View } from 'react-native';

import styles from './TextInput.styles';

export default class TextInput extends PureComponent {
    static propTypes = {
        autoFocus: PropTypes.bool.isRequired,
        multiline: PropTypes.bool.isRequired,
        style: ViewPropTypes.style,
        inputStyle: ViewPropTypes.style,
        label: PropTypes.string,
        onMount: PropTypes.func,
    };

    static defaultProps = {
        autoFocus: false,
        editable: true,
        multiline: false,
        style: {},
        inputStyle: {},
        label: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            showPassword: !props.secureTextEntry,
        };
    }

    inputRef = (input) => {
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
        const { style, multiline, label, inputStyle } = this.props;
        const { showPassword } = this.state;

        const inputStyles = [styles.input];
        const labelEl = label && <Text style={styles.label}>{label}</Text>;

        if (multiline) {
            inputStyles.push(styles.multilineInput);
        }

        inputStyles.push(inputStyle);

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
                </View>
            </View>
        );
    }
}
