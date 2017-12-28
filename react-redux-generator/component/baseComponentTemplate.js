import React, {
    PureComponent,
} from 'react';

import {
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    Text,
} from 'components';

import styles from './COMPONENT_NAME.styles';

export default class COMPONENT_NAME extends PureComponent {
    static propTypes = {};

    render() {
        const {  } = this.props;

        return (
            <View style={styles.container}>
                <Text>COMPONENT_NAME</Text>
            </View>
        );
    }
}
