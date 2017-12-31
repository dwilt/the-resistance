import React, { PureComponent } from 'react';

import { View, Image, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

import { Text } from 'components';

import styles from './ImageButton.styles';

export default class ImageButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        selected: PropTypes.bool.isRequired,
        children: PropTypes.node.isRequired,
        source: PropTypes.number.isRequired,
    };

    static defaultProps = {
        selected: false,
    };

    render() {
        const { onPress, selected, children, source } = this.props;

        const imageContainerStyles = [styles.imageContainer];
        const labelStyles = [styles.label];

        if (selected) {
            imageContainerStyles.push(styles.selectedImageContainer);
            labelStyles.push(styles.selectedLabel);
        }

        return (
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <View style={imageContainerStyles}>
                    <Image style={styles.image} source={source} />
                </View>
                <Text style={labelStyles}>{children}</Text>
            </TouchableOpacity>
        );
    }
}
