import React, { PureComponent } from 'react';

import { View } from 'react-native';

import PropTypes from 'prop-types';

import styles from './Header.styles';

export default class Header extends PureComponent {
    static propTypes = {
        menuToggle: PropTypes.node.isRequired,
    };

    render() {
        const { menuToggle } = this.props;

        return <View style={styles.container}>{menuToggle}</View>;
    }
}
