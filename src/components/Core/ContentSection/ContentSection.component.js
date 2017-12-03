import React, {
    PureComponent,
} from 'react';

import {
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import styles from './ContentSection.styles';

export default class ContentSection extends PureComponent {
    static propTypes = {
        children:PropTypes.node.isRequired,
    };

    render() {
        const { children } = this.props;

        return (
            <View style={styles.container}>
                {children}
            </View>
        );
    }
}
