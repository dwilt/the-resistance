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

export default class ForgotPasswordResetButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        isResetting: PropTypes.bool.isRequired,
        formIsValid: PropTypes.bool.isRequired,
    };

    render() {
        const { isResetting, onPress, formIsValid } = this.props;

        return (
            <ActionButton
                onPress={onPress}
                isLoading={isResetting}
                disabled={isResetting || !formIsValid}
            >
                {getLocalizedString(`forgotPassword.reset`)}
            </ActionButton>
        );
    }
}
