import React, { PureComponent } from "react";

import PropTypes from "prop-types";

import { Text } from "components";

import { TextInput as RNTextInput, View } from "react-native";

import styles from "./CodeInput.styles";

class CodeInput extends PureComponent {
    static propTypes = {
        label: PropTypes.string,
        numerical: PropTypes.bool.isRequired,
        numberOfInputs: PropTypes.number.isRequired,
        onChangeText: PropTypes.func.isRequired,
    };

    static defaultProps = {
        numberOfInputs: 3,
        numerical: true,
        autoFocus: true,
    };

    state = {
        complete: false,
    };

    inputs = {};
    text = {};

    inputRef = (el, i) => {
        if (!this.inputs[i]) {
            const { autoFocus } = this.props;

            this.inputs[i] = el;

            if (autoFocus && el && i === 0) {
                el.focus();
            }
        }
    };

    onChangeText = (text, i) => {
        const { onChangeText } = this.props;

        this.text[i] = text;

        if (text) {
            const nextInput = this.inputs[i + 1];

            if (nextInput) {
                nextInput.focus();
            }
        }

        const completeString = Object.keys(this.text).reduce(
            (current, key) => current + this.text[key],
            ``
        );

        onChangeText(completeString);
    };

    render() {
        const { numberOfInputs, label, numerical } = this.props;

        const labelEl = label && <Text style={styles.label}>{label}</Text>;
        const keyboardType = numerical ? `numeric` : `default`;

        return (
            <View style={styles.container}>
                {labelEl}
                <View style={styles.inputsContainer}>
                    {new Array(numberOfInputs)
                        .fill(1)
                        .map((number, i) => (
                            <RNTextInput
                                onChangeText={text =>
                                    this.onChangeText(text, i)
                                }
                                ref={el => this.inputRef(el, i)}
                                style={styles.input}
                                value={this.text[i]}
                                key={i}
                                keyboardType={keyboardType}
                                placeholder={`${i + 1}`}
                            />
                        ))}
                </View>
            </View>
        );
    }
}

export default CodeInput;
