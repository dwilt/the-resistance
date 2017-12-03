import React, {
    Component,
} from 'react';

import PropTypes from 'prop-types';

import {
    ErrorMessage,
} from '/components';

export default class LoginError extends Component {
    static propTypes = {
        error: PropTypes.string,
    };

    render() {
        return (
            <ErrorMessage
                {...this.props}
            />
        );
    }
}
