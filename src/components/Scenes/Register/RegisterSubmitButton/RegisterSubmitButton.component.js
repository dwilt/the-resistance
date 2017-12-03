import React, {
    Component,
} from 'react';

import PropTypes from 'prop-types';

import {
    ActionButton,
} from '/components';

import {
   getLocalizedString,
} from '/services/locale.service';

export default class RegisterButton extends Component {
    static propTypes = {
        isRegistering: PropTypes.bool.isRequired,
        formIsValid: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    render() {
        const { isRegistering,formIsValid,onPress } = this.props;

        return (
            <ActionButton
                onPress={onPress}
                disabled={isRegistering || !formIsValid}
                isLoading={isRegistering}
            >
                {getLocalizedString(`register.submitButton`)}
            </ActionButton>
        );
    }
}
