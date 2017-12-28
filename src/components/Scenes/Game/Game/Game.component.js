import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
    BuildMissionTeam,
    Completed,
    ConductMission,
    Lobby,
    MissionOutcome,
    MissionTeamVote,
    MissionTeamVoteOutcome,
    Scene,
} from 'components';

import { gameStates } from '../../../../gameStructure';

class Game extends Component {
    static propTypes = {
        state: PropTypes.string.isRequired,
    };

    render() {
        const { state } = this.props;

        switch (state) {
            case gameStates.LOBBY:
                return <Lobby />;

            default:
                return null;
        }
    }
}

Game.key = `GAME_KEY`;

export default Game;
