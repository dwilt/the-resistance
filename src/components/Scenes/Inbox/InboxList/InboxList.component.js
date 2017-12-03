import React, {
    PureComponent,
} from 'react';

import {
    FlatList,
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    InboxListItem,
    Loader,
} from '/components';

import styles from './InboxList.styles';

export default class InboxList extends PureComponent {
    static propTypes = {
        messages: PropTypes.array,
        sync: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { sync } = this.props;

        sync();
    }

    render() {
        const { messages } = this.props;

        let content = (
            <Loader/>
        );

        if (messages) {
            const renderItem = ({ item: { id } }) => {
                return (
                    <View style={styles.message}>
                        <InboxListItem
                            id={id}
                        />
                    </View>
                );
            };

            content = (
                <FlatList
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={({ id }) => id}
                />
            );
        }

        return (
            <View style={styles.container}>
                {content}
            </View>
        );
    }
}
