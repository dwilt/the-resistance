import React, { PureComponent } from 'react';

import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import PropTypes from 'prop-types';

import { iconSize, iconColor } from './MenuToggle.styles';

export default class MenuToggle extends PureComponent {
    static propTypes = {
        open: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    render() {
        const { open, onPress } = this.props;

        const icon = open ? (
            <Icon name={`times`} size={iconSize} color={iconColor} />
        ) : (
            <Icon name={`bars`} size={iconSize} color={iconColor} />
        );

        return <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>;
    }
}
