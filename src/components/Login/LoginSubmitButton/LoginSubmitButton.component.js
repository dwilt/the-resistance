import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { ActionButton } from 'components';

export default class LoginSubmitButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        registering: PropTypes.bool.isRequired,
    };

    render() {
        const { registering, ...rest } = this.props;

        return !registering ? (
            <ActionButton {...rest} theme={`teal`}>
                {`Login`}
            </ActionButton>
        ) : null;
    }
}
