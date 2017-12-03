import React, {
    PureComponent,
} from 'react';

import {
    TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    ChevronIcon,
    XIcon,
} from '/components';

import styles from './BackButton.styles';

export default class BackButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        icon: PropTypes.oneOf([
            `chevron`,
            `x`,
        ]),
    };

    static defaultProps = {
        icon: `chevron`,
    };

    render() {
        const { icon, ...rest } = this.props;
        const iconImage = icon === `chevron` ? (
            <ChevronIcon/>
        ) : (
            <XIcon/>
        );

        return (
            <TouchableOpacity
                {...rest}
                style={styles.container}
            >
                {iconImage}
            </TouchableOpacity>
        );
    }
}
