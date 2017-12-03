import React, {
    Component,
} from 'react';

import PropTypes from 'prop-types';

import {
    TextInput,
} from '/components';

import {
   getLocalizedString,
} from '/services/locale.service';

export default class RegisterEmail extends Component {
    static propTypes = {
        onChangeText: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
    };

    render() {
        return (
            <TextInput
                {...this.props}
                autoCapitalize={`none`}
                autoCorrect={false}
                keyboardType={`email-address`}
                returnKeyType={`next`}
                placeholder={getLocalizedString(`register.email.placeholder`)}
            />
        );
    }
}
