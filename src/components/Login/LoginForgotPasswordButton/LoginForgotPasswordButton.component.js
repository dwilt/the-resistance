import React, { PureComponent } from 'react';

import { View } from 'react-native';

import PropTypes from 'prop-types';

import { TextButton } from 'components';

export default class LoginForgotPasswordButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
    };

    render() {
        return <TextButton {...this.props}>Forgot Password?</TextButton>;
    }
}
