import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    Text,
} from '/components';

import styles from './ProfileEmailInput.styles.js';

export default class ProfileEmailInput extends PureComponent {
    static propTypes = {
        email: PropTypes.string.isRequired,
    };

    render() {
        const { email } = this.props;

        return (
            <Text style={styles.text}>{email}</Text>
        );
    }
}
