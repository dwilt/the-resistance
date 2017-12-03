import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    ActionButton,
} from '/components';

import {
    getLocalizedString,
} from '/services/locale.service';

export default class PokeUtilitySend extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <ActionButton
                {...this.props}
            >
                {getLocalizedString(`pokeUtility.send`)}
            </ActionButton>
        );
    }
}
