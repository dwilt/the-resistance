import React, { PureComponent } from 'react';

import { TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import PropTypes from 'prop-types';

import styles, { iconSize, iconColor } from './MenuToggle.styles';

export default class MenuToggle extends PureComponent {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    render() {
        const { isOpen, onPress } = this.props;

        const icon = isOpen ? (
            <Icon name={`times`} size={iconSize} color={iconColor} />
        ) : (
            <Icon name={`bars`} size={iconSize} color={iconColor} />
        );

        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container}>{icon}</View>
            </TouchableOpacity>
        );
    }
}
