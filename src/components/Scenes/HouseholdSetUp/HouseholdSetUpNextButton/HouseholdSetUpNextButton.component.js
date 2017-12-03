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

export default class HouseholdAttributesNextButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
    };

    render() {
        return (
            <ActionButton
                {...this.props}
            >
                {getLocalizedString(`householdSetUp.next`)}
            </ActionButton>
        );
    }
}
