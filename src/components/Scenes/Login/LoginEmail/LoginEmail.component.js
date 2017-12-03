import React, {
    Component,
} from 'react';

import PropTypes from 'prop-types';

import {
    getLocalizedString,
} from '/services/locale.service';

import {
    TextInput,
} from '/components';

export default class LoginEmail extends Component {
    static propTypes = {
        onChangeText: PropTypes.func.isRequired,
        value: PropTypes.string,
    };

    render() {
        return (
            <TextInput
                {...this.props}
                autoCapitalize={`none`}
                autoCorrect={false}
                keyboardType={`email-address`}
                returnKeyType={`next`}
                placeholder={getLocalizedString(`login.email`)}
            />
        );
    }
}
