import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { Image } from 'react-native';

import styles from './PlayingCard.styles';

export default class PlayingCard extends PureComponent {
    static propTypes = {
        source: PropTypes.number.isRequired,
    };

    render() {
        return <Image {...this.props} style={styles.image} />;
    }
}
