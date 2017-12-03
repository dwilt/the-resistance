import React, {
    PureComponent,
} from 'react';

import {
   Loader,
} from '/components';

import PropTypes from 'prop-types';

export default class InboxActivityIndicator extends PureComponent {
    static propTypes = {
        show: PropTypes.bool.isRequired,
    };

    render() {
        const { show } = this.props;

        return show ? (
            <Loader/>
        ) : null;
    }
}
