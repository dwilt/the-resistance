import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    ErrorMessage,
} from '/components';

export default class UtilityPickerError extends PureComponent {
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
