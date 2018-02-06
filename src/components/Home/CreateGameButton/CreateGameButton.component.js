import React, { PureComponent } from "react";

import PropTypes from "prop-types";

import { ActionButton } from "components";

export default class CreateGameButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
    };

    render() {
        return <ActionButton {...this.props}>Host New Game</ActionButton>;
    }
}
