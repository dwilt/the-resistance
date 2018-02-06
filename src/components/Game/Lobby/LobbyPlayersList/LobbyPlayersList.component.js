import React, { Component } from "react";

import PropTypes from "prop-types";

import { PlayersList } from "components";

export default class LobbyPlayersList extends Component {
    static propTypes = {
        players: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            })
        ).isRequired,
    };

    render() {
        return <PlayersList {...this.props} />;
    }
}
