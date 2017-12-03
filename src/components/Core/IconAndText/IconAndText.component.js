import React, {
    PureComponent,
} from 'react';

import {
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    Icon,
    Text,
} from '/components';

import styles, {
    iconSize,
    iconColor,
} from './IconAndText.styles';

export default class IconAndText extends PureComponent {
    static propTypes = {
        text: PropTypes.string.isRequired,
        maxWidth: PropTypes.bool.isRequired,
        icon: PropTypes.string.isRequired,
    };

    static defaultProps = {
        maxWidth: true,
        icon: `home`,
    };

    render() {
        const { text, icon } = this.props;

        return (
            <View style={styles.container}>
                <Icon
                    name={icon}
                    size={iconSize}
                    color={iconColor}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </View>
        );
    }
}
