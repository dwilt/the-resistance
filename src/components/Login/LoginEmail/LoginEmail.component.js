import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { TextInput } from 'components';

export default class LoginEmail extends PureComponent {
    static propTypes = {
        value: PropTypes.string,
        onChangeText: PropTypes.func.isRequired,
    };

    render() {
        return (
            <TextInput
                {...this.props}
                label={`Email`}
                keyboardType={`email-address`}
                autoCapitalize={`none`}
            />
        );
    }
}
