import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { Image } from 'react-native';

import { cardWidth, getCardHeight } from './PlayingCard.styles';

export default class PlayingCard extends PureComponent {
    static propTypes = {
        source: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
    };

    static defaultProps = {
        width: cardWidth,
    };

    render() {
        const { width } = this.props;

        return (
            <Image
                {...this.props}
                style={{
                    width,
                    height: getCardHeight(width),
                }}
            />
        );
    }
}
