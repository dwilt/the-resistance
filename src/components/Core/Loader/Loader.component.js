import React, {
    PureComponent,
} from 'react';

import {
    ActivityIndicator,
    View,
    ViewPropTypes,
} from 'react-native';

import PropTypes from 'prop-types';

import styles from './Loader.styles';

export default class Loader extends PureComponent {
    static propTypes = {
        stretch: PropTypes.bool.isRequired,
        style: ViewPropTypes.style,
    };

    static defaultProps = {
        stretch: true,
        style: {},
    };

    render() {
        const { stretch, style } = this.props;
        const containerStyles = [styles.container];

        if (stretch) {
            containerStyles.push(styles.stretchContainer);
        }

        containerStyles.push(style);

        return (
            <View style={containerStyles}>
                <ActivityIndicator/>
            </View>
        );
    }
}
