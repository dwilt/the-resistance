import React, { PureComponent } from 'react';

import { View, Image, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

import { Text } from 'components';

const missionLeaderBadge = require(`assets/images/mission-leader-icon.png`);

import styles from './LoginTitle.styles';

export default class LoginTitle extends PureComponent {
    static propTypes = {
        isRegistering: PropTypes.bool.isRequired,
        toggleForm: PropTypes.func.isRequired,
    };

    render() {
        const { isRegistering, toggleForm } = this.props;

        const text = isRegistering ? `Create An Account` : `Login`;

        const subtitle = isRegistering ? (
            <View style={styles.subtitleContainer}>
                <Text style={styles.subtitle}>
                    {`Already have an account?`}
                </Text>
                <TouchableOpacity onPress={toggleForm}>
                    <Text style={styles.toggleFormButton}>Login</Text>
                </TouchableOpacity>
            </View>
        ) : (
            <View style={styles.subtitleContainer}>
                <Text style={styles.subtitle}>Don't have an account?</Text>
                <TouchableOpacity onPress={toggleForm}>
                    <Text style={styles.toggleFormButton}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        );

        return (
            <View style={styles.container}>
                <Image style={styles.badge} source={missionLeaderBadge} />
                <Text style={styles.title}>{text}</Text>
                {subtitle}
            </View>
        );
    }
}
