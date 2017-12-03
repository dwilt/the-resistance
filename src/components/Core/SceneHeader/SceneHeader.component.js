import React, {
    PureComponent,
} from 'react';

import {
    View,
    ViewPropTypes,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    Text,
} from '/components';

import styles from './SceneHeader.styles';

export default class SceneHeader extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.node,
        subheader: PropTypes.node,
        style: ViewPropTypes.style,
    };

    static defaultProps = {
        style: {},
        subheader: null,
    };

    render() {
        const { title, children, style, subheader } = this.props;

        return (
            <View style={[styles.container, style]}>
                <View style={styles.innerContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        {children}
                    </View>
                </View>
                {subheader}
            </View>
        );
    }
}
