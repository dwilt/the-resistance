import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    TextInput,
} from '/components';

import {
    getLocalizedString,
} from '/services/locale.service';

import styles from './SupportMessageInput.styles';

export default class SupportMessageInput extends PureComponent {
    static propTypes = {
        value: PropTypes.string,
        onChangeText: PropTypes.func.isRequired,
    };

    render() {
        return (
            <TextInput
                {...this.props}
                multiline={true}
                inputStyle={styles.input}
                placeholder={getLocalizedString(`support.message.placeholder`)}
                blurOnSubmit={true}
            />
        );
    }
}
