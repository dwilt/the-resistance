import React, { PureComponent } from "react";

import PropTypes from "prop-types";

import { ActionButton } from "components";

export default class ConductMissionButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <ActionButton {...this.props} theme={`teal`}>
                {`Conduct Mission`}
            </ActionButton>
        );
    }
}
