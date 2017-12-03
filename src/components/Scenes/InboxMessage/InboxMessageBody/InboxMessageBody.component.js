import React, {
    PureComponent,
} from 'react';

import {
    WebView,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    Loader,
} from '/components';

import styles from './InboxMessageBody.styles';

export default class InboxMessageBody extends PureComponent {
    static propTypes = {
        body: PropTypes.string,
    };

    render() {
        const { body } = this.props;

        return body ? (
            <WebView
                source={{ html: body }}
                style={styles.container}
            />
        ) : (
            <Loader/>
        );
    }
}
