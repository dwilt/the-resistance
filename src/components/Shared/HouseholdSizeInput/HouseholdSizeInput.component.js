import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    NumberInput,
} from '/components';

import {
    getLocalizedString,
} from '/services/locale.service';

export default class HouseholdSizeInput extends PureComponent {
    static propTypes = {
        value: PropTypes.number,
        onIncrement: PropTypes.func.isRequired,
        onDecrement: PropTypes.func.isRequired,
    };

    render() {
        const { value } = this.props;

        return (
            <NumberInput
                {...this.props}
                label={getLocalizedString(`misc.householdSizeInput`)}
                decrementDisabled={value === 1}
            />
        );
    }
}
