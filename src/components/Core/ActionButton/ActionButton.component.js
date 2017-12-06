import React, { PureComponent } from "react";

import {
    ActivityIndicator,
    TouchableOpacity,
    View,
    ViewPropTypes
} from "react-native";

import PropTypes from "prop-types";

import styles from "./ActionButton.styles";

import { Text } from "../Text";

export default class ActionButton extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired,
        children: PropTypes.node.isRequired,
        disabled: PropTypes.bool,
        theme: PropTypes.oneOf([`teal`, `darkTeal`]),
        style: ViewPropTypes.style
    };

    static defaultProps = {
        disabled: false,
        isLoading: false,
        theme: `teal`,
        style: {}
    };

    render() {
        const {
            theme,
            onPress,
            children,
            isLoading,
            disabled,
            style
        } = this.props;

        const textStyles = [styles.text];
        const buttonStyles = [styles.textContainer];

        buttonStyles.push(styles[`${theme}TextContainer`], style);

        const isLoadingEl = isLoading && (
            <View style={styles.loader}>
                <ActivityIndicator color={`white`} />
            </View>
        );

        if (isLoading) {
            textStyles.push(styles.hiddenText);
        }

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
