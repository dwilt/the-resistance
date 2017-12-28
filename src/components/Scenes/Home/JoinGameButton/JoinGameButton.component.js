import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { ActionButton } from 'components';

export default class JoinGameButton extends Component {
    static defaultProps = {
        onPress: PropTypes.func.isRequired,
    };

    render() {
        return (
            <ActionButton {...this.props} theme={`teal`}>
                {`Join Existing Game`}
            </ActionButton>
        );
    }
}
