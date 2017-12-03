import React, {
    Component,
} from 'react';

import PropTypes from 'prop-types';

import {
    getLocalizedString,
} from '/services/locale.service';

import {
    ActionButton,
} from '/components';

export default class LoginButton extends Component {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        formIsValid: PropTypes.bool.isRequired,
        isLoggingIn: PropTypes.bool.isRequired,
    };

    render() {
        const { isLoggingIn, onPress, formIsValid } = this.props;
        return (
            <ActionButton
                isLoading={isLoggingIn}
                disabled={!formIsValid || isLoggingIn}
                onPress={onPress}
            >
                {getLocalizedString(`login.login-button`)}
            </ActionButton>
        );
    }
}
