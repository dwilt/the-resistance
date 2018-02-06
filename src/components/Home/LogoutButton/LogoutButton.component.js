import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { TextButton } from 'components';

export default class LogoutButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
    };

    render() {
        return <TextButton {...this.props}>Logout</TextButton>;
    }
}
