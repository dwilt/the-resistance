import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { ErrorMessage, Text } from 'components';

export default class ForgotPasswordError extends PureComponent {
    static propTypes = {
        error: PropTypes.string,
    };

    render() {
        return <ErrorMessage {...this.props} />;
    }
}
