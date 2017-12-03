import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    Text,
} from '/components';

import styles from './InboxMessageSubject.styles';

export default class InboxMessageSubject extends PureComponent {
    static propTypes = {
        subject: PropTypes.string.isRequired,
    };

    render() {
        const { subject } = this.props;

        return (
            <Text style={styles.subject}>{subject}</Text>
        );
    }
}
