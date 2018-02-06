import React, { PureComponent } from 'react';

import {
    View,
    TouchableOpacity,
    ViewPropTypes,
    Text as RNText,
} from 'react-native';

import PropTypes from 'prop-types';

import { Text } from 'components';

import styles from './TextButton.styles';

export default class TextButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        children: PropTypes.string.isRequired,
        style: ViewPropTypes.style,
        textStyles: RNText.propTypes.style,
    };

    static defaultProps = {
        style: {},
        textStyles: {},
    };

    render() {
        const { onPress, children, style, textStyles } = this.props;

        return (
            <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, textStyles]}>{children}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
