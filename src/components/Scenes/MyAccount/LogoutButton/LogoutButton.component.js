import React, { PureComponent } from "react";

import { TouchableOpacity } from "react-native";

import PropTypes from "prop-types";

import { Icon, Text } from "/components";

import { getLocalizedString } from "/services/locale.service";

import styles, { iconColor, iconSize } from "./LogoutButton.styles";

export default class LogoutButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired
    };

    render() {
        const { onPress } = this.props;

        return (
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Icon name={`power-switch`} color={iconColor} size={iconSize} />
                <Text style={styles.text}>
                    {getLocalizedString(`myAccount.logout`)}
                </Text>
            </TouchableOpacity>
        );
    }
}
