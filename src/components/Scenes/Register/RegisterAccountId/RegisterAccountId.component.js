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

export default class AccountId extends Component {
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
                returnKeyType={`next`}
                placeholder={getLocalizedString(`register.accountId.placeholder`)}
                label={getLocalizedString(`register.accountId.label`)}
            />
        );
    }
}
