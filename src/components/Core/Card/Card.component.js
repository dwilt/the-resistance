import React, {
    PureComponent,
} from 'react';

import {
    TouchableOpacity,
    View,
    ViewPropTypes,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    Icon,
    Text,
} from '/components';

import styles, {
    iconSize,
    iconColor,
} from './Card.styles';

export default class Card extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        icon: PropTypes.string,
        onPress: PropTypes.func,
        style: ViewPropTypes.style,
    };

    static defaultProps = {
        style: {},
    };

    render() {
        const { title, subtitle, icon, onPress, style } = this.props;
        const containerStyles = [styles.container, style];

        const subtitleEl = subtitle && (
            <Text style={styles.subtitle}>{subtitle}</Text>
        );

        if (!subtitle) {
            containerStyles.push(styles.noSubtitleContainer);
        }

        const iconEl = icon && (
            <View
                style={styles.iconContainer}
            >
                <Icon
                    size={iconSize}
                    name={icon}
                    color={iconColor}
                />
            </View>
        );

        const children = (
            <View style={containerStyles}>
                {iconEl}
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    {subtitleEl}
                </View>
            </View>
        );

        return onPress ? (
            <TouchableOpacity
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        ) : children;
    }
}
