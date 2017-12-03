import React, {
    PureComponent,
} from 'react';

import {
    FlatList,
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    Card,
} from '/components';

import styles from './CardList.styles';

export default class CardList extends PureComponent {
    static propTypes = {
        cards: PropTypes.array.isRequired,
        stretch: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        stretch: true,
    };

    render() {
        const { cards, stretch } = this.props;
        const containerStyles = [styles.container];

        if (!stretch) {
            containerStyles.push(styles.unStretchedContainer);
        }

        const renderItem = ({ item: card, index }) => {
            const cardStyles = [styles.card];

            if (index === cards.length - 1) {
                cardStyles.push(styles.lastCard);
            }

            return (
                <View
                    style={cardStyles}
                >
                    <Card
                        {...card}
                    />
                </View>
            );
        };

        return (
            <FlatList
                data={cards}
                renderItem={renderItem}
                keyExtractor={({ id }) => id}
                style={containerStyles}
            />
        );
    }
}
