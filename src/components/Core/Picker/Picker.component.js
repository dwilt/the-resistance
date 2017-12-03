import React, {
    PureComponent,
} from 'react';

import {
    Picker as RNPicker,
} from 'react-native';

import PropTypes from 'prop-types';

import styles from './Picker.styles';

export default class Picker extends PureComponent {
    static propTypes = {
        onValueChange: RNPicker.propTypes.onValueChange.isRequired,
        selectedValue: RNPicker.propTypes.selectedValue.isRequired,
        values: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
        })),
    };

    render() {
        const { onValueChange, selectedValue, values } = this.props;

        return (
            <RNPicker
                {...this.props}
                onValueChange={onValueChange}
                selectedValue={selectedValue}
                style={styles.container}
            >
                {values.map((item) => (
                    <RNPicker.Item
                        {...item}
                        key={item.value}
                    />
                ))}
            </RNPicker>
        );
    }
}
