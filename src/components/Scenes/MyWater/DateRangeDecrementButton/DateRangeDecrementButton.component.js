import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    TouchableOpacity,
} from 'react-native';

import {
   ChevronIcon,
} from '/components';

import styles, {
    arrowSize,
} from './DateRangeDecrementButton.styles';

export default class DateRangeDecrementButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
    };

    render() {
        return (
            <TouchableOpacity
                {...this.props}
                style={styles.button}
            >
                <ChevronIcon
                    size={arrowSize}
                />
            </TouchableOpacity>
        );
    }
}
