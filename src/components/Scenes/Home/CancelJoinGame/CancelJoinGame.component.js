import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    ActionButton,
} from 'components';

export default class CancelJoinGame extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
    };

    render() {
        return (
            <ActionButton
                {...this.props}
            >
                {`Cancel`}
            </ActionButton>
        );
    }
}
