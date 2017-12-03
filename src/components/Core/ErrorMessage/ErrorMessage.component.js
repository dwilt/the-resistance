import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    Text,
} from '/components';

import styles from './ErrorMessage.styles';

export default class ErrorMessage extends PureComponent {
    static propTypes = {
        error: PropTypes.string,
    };

    render() {
        const { error } = this.props;

        return error ? (
            <Text style={styles.error}>{error}</Text>
        ) : null;
    }
}
