import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import styles from './Scene.styles';

import { Image, View } from 'react-native';

const blurImage = require(`assets/images/blur-bg.png`);

export default class Scene extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    render() {
        const { children } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.bgContainer}>
                    <Image style={styles.bg} source={blurImage} />
                </View>
                <View style={styles.innerContainer}>{children}</View>
            </View>
        );
    }
}
