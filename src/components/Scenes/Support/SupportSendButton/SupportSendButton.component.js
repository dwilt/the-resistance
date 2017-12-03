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

export default class SupportSendButton extends PureComponent {
    static propTypes = {
        formIsValid: PropTypes.bool.isRequired,
        isSending: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    render() {
        const { isSending, formIsValid, onPress } = this.props;
        const disabled = !formIsValid || isSending;

        return (
            <ActionButton
                disabled={disabled}
                isLoading={isSending}
                onPress={onPress}
            >
                {getLocalizedString(`support.sendButton`)}
            </ActionButton>
        );
    }
}
