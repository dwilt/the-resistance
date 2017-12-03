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

export default class ForgotPasswordInput extends PureComponent {
    static propTypes = {
        value: PropTypes.string,
        onChangeText: PropTypes.func.isRequired,
    };

    render() {
        return (
            <TextInput
                {...this.props}
                autoCapitalize={`none`}
                autoCorrect={false}
                keyboardType={`email-address`}
                returnKeyType={`done`}
                placeholder={getLocalizedString(`forgotPassword.email`)}
            />
        );
    }
}
