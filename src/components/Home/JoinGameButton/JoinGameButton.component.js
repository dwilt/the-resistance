import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { ActionButton } from 'components';

export default class JoinGameButton extends Component {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <ActionButton {...this.props} theme={`teal`}>
                {`Join Game`}
            </ActionButton>
        );
    }
}
