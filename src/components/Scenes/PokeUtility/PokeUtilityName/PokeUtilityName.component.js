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

export default class PokeUtilityName extends PureComponent {
    static propTypes = {
        onChangeText: PropTypes.func.isRequired,
    };

    render() {
        return (
            <TextInput
                {...this.props}
                autoCapitalize={`words`}
                autoCorrect={false}
                returnKeyType={`next`}
                placeholder={getLocalizedString(`pokeUtility.name`)}
            />
        );
    }
}
