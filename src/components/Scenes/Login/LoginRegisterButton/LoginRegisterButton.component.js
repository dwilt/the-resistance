import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    getLocalizedString,
} from '/services/locale.service';

import {
    TextButton,
} from '/components';

export default class LoginRegisterButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
    };

    render() {
        return (
            <TextButton
                {...this.props}
            >
                {getLocalizedString(`login.register`)}
            </TextButton>
        );
    }
}
