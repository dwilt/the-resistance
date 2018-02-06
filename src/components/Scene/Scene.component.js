import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import styles from './Scene.styles';

import { Image, View, StatusBar } from 'react-native';

import { MenuToggle, Header } from 'components';

StatusBar.setHidden(true);

const blurImage = require(`assets/images/blur-bg.png`);

export default class Scene extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        menuToggle: PropTypes.node,
    };

    render() {
        const { children, menuToggle } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.bgContainer}>
                    <Image style={styles.bg} source={blurImage} />
                </View>
                {menuToggle && <Header menuToggle={menuToggle} />}
                <View style={styles.innerContainer}>{children}</View>
            </View>
        );
    }
}
