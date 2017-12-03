import React, {
    PureComponent,
} from 'react';

import {
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    Tab,
} from '/components';

import styles  from './Tabs.styles';

export default class Tabs extends PureComponent {
    static propTypes = {
        activeFilter: PropTypes.string.isRequired,
        children: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,
            onPress: PropTypes.func.isRequired,
            label: PropTypes.string.isRequired,
        })).isRequired,
    };

    render() {
        const { activeFilter, children } = this.props;

        return (
            <View style={styles.container}>
                {children.map(({ id, onPress, label }) => (
                    <View
                        key={id}
                        style={styles.tab}
                    >
                        <Tab
                            onPress={onPress}
                            active={activeFilter === id}
                        >
                            {label}
                        </Tab>
                    </View>
                ))}
            </View>
        );
    }
}
