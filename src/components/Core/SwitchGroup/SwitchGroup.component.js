import React, {
    PureComponent,
} from 'react';

import {
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    Switch,
    Text,
} from '/components';

import styles from './SwitchGroup.styles';

export default class SwitchGroup extends PureComponent {
    static propTypes = {
        switches: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.bool.isRequired,
            onValueChange: PropTypes.func.isRequired,
            label: PropTypes.string.isRequired,
        })).isRequired,
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
    };

    render() {
        const { switches, title, subtitle } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.titlesContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
                <View style={styles.group}>
                    {switches.map(({ value, onValueChange, label }, i) => (
                        <View
                            key={i}
                        >
                            <Switch
                                value={value}
                                onValueChange={onValueChange}
                            >
                                {label}
                            </Switch>
                        </View>
                    ))}
                </View>
            </View>
        );
    }
}
