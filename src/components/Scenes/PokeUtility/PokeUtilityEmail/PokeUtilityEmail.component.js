import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
   getLocalizedString,
} from '/services/locale.service';

import {
    TextInput,
} from '/components';

export default class PokeUtilityEmail extends PureComponent {
    static propTypes = {
        onChangeText: PropTypes.func.isRequired,
    };

    render() {
        return (
            <TextInput
                {...this.props}
                autoCapitalize={`none`}
                autoCorrect={false}
                keyboardType={`email-address`}
                returnKeyType={`next`}
                placeholder={getLocalizedString(`pokeUtility.email`)}
            />
        );
    }
}
