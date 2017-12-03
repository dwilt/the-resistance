import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    Icon,
} from '/components';

import styles, {
    activeIconColor,
    iconSize,
    inactiveIconColor,
} from './TabbarTab.styles';

export default class TabbarTab extends PureComponent {
    static propTypes = {
        active: PropTypes.bool.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
    };

    render() {
        const { icon, active, label } = this.props;
        const labelStyles = [styles.label];
        const iconColor = active ? activeIconColor : inactiveIconColor;

        if (active) {
            labelStyles.push(styles.activeLabel);
        }

        return (
            <Icon
                size={iconSize}
                color={iconColor}
                textStyle={labelStyles}
                text={label}
                name={icon}
            />
        );
    }
}
