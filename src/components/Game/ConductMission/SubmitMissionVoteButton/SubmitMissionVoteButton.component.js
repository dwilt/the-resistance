import React, { PureComponent } from "react";

import PropTypes from "prop-types";

import { ActionButton } from "components";

export default class SubmitMissionVoteButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        disabled: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <ActionButton {...this.props} theme={`teal`}>
                {`Submit Vote`}
            </ActionButton>
        );
    }
}
