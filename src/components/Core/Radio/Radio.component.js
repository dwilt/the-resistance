import React, {
    PureComponent,
} from 'react';

import {
    TouchableOpacity,
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    Text,
} from '/components';

import styles from './Radio.styles';

export default class Radio extends PureComponent {
    static propTypes = {
        label: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
        })).isRequired,
        onPress: PropTypes.func.isRequired,
        selected: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
    };

    render() {
        const { label, options, selected, onPress } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.label}>{label}</Text>
                <View style={styles.optionsContainer}>
                    {options.map(({ label: buttonLabel, value }, i) => {
                        const buttonStyles = [styles.button];
                        const buttonLabelStyles = [styles.buttonLabel];
                        const isSelected = selected === value;

                        if (i === 0) {
                            buttonStyles.push(styles.firstButton);
                        }

                        if (i === options.length - 1) {
                            buttonStyles.push(styles.lastButton);
                        }

                        if (isSelected) {
                            buttonStyles.push(styles.selectedButton);
                            buttonLabelStyles.push(styles.selectedButtonLabel);
                        }

                        return (
                            <TouchableOpacity
                                style={buttonStyles}
                                disabled={isSelected}
                                onPress={() => onPress(value)}
                                key={value}
                            >
                                <Text style={buttonLabelStyles}>
                                    {buttonLabel}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        );
    }
}
