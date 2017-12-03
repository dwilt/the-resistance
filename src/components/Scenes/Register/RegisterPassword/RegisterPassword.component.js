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

export default class RegisterPassword extends Component {
    static propTypes = {
        onChangeText: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
    };

    render() {
        return (
            <TextInput
                {...this.props}
                returnKeyType={`go`}
                placeholder={getLocalizedString(`register.password.placeholder`)}
                secureTextEntry
            />
        );
    }
}
