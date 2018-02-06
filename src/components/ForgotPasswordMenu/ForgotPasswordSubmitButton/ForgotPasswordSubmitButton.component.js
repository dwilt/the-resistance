import React, { PureComponent } from 'react';

import { View } from 'react-native';

import PropTypes from 'prop-types';

import { ActionButton, Text } from 'components';

export default class ForgotPasswordSubmitButton extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    render() {
        return <ActionButton {...this.props}>Submit</ActionButton>;
    }
}
