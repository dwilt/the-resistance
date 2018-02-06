import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { ActionButton } from 'components';

class GameCode extends Component {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
    };

    render() {
        return <ActionButton {...this.props}>Start Game</ActionButton>;
    }
}

export default GameCode;
