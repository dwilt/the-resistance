import React, { PureComponent } from "react";

import PropTypes from "prop-types";

import { PlayerIconList } from "components";

export default class ConductMissionPlayersList extends PureComponent {
    static propTypes = {
        players: PropTypes.array.isRequired,
    };

    render() {
        return <PlayerIconList {...this.props} />;
    }
}
