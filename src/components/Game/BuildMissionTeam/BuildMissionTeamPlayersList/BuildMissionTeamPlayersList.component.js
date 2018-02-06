import React, { Component } from "react";

import PropTypes from "prop-types";

import { PlayersList } from "components";

export default class BuildMissionTeamPlayersList extends Component {
    static propTypes = {
        onPlayerTap: PropTypes.func.isRequired,
        isLeader: PropTypes.bool.isRequired,
        isFilled: PropTypes.bool.isRequired,
        proposedTeam: PropTypes.arrayOf(PropTypes.string).isRequired,
        players: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            })
        ).isRequired,
    };

    render() {
        const {
            isLeader,
            players,
            proposedTeam = [],
            isFilled,
            onPlayerTap,
        } = this.props;

        return (
            <PlayersList
                players={players.map(player => ({
                    ...player,
                    selected: proposedTeam.indexOf(player.id) !== -1,
                }))}
                onPlayerTap={isLeader ? onPlayerTap : null}
                disabled={isLeader && isFilled}
            />
        );
    }
}
