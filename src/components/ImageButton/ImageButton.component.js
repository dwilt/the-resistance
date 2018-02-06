import React, { PureComponent } from "react";

import { View, TouchableOpacity } from "react-native";

import PropTypes from "prop-types";

import { Text } from "components";

import styles from "./ImageButton.styles";

export default class ImageButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        selected: PropTypes.bool.isRequired,
        children: PropTypes.node.isRequired,
        text: PropTypes.string.isRequired,
    };

    static defaultProps = {
        selected: false,
    };

    render() {
        const { onPress, selected, children, text } = this.props;

        const imageContainerStyles = [styles.imageContainer];
        const labelStyles = [styles.label];

        if (selected) {
            imageContainerStyles.push(styles.selectedImageContainer);
            labelStyles.push(styles.selectedLabel);
        }

        return (
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <View style={imageContainerStyles}>{children}</View>
                <Text style={labelStyles}>{text}</Text>
            </TouchableOpacity>
        );
    }
}
