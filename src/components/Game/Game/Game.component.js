import React, { Component } from "react";

import PropTypes from "prop-types";

import {
    BuildMissionTeam,
    Completed,
    ConductMission,
    Lobby,
    MissionOutcome,
    MissionTeamVote,
    MissionTeamVoteOutcome,
    Scene,
} from "components";

import { gameStates } from "src/gameStructure";

class Game extends Component {
    static propTypes = {
        state: PropTypes.string.isRequired,
    };

    render() {
        const { state } = this.props;

        let content = null;

        switch (state) {
        case gameStates.LOBBY:
            content = <Lobby />;
            break;

        case gameStates.BUILD_MISSION_TEAM:
            content = <BuildMissionTeam />;
            break;

        case gameStates.MISSION_TEAM_VOTE:
            content = <MissionTeamVote />;
            break;

        case gameStates.MISSION_TEAM_VOTE_OUTCOME:
            content = <MissionTeamVoteOutcome />;
            break;

        case gameStates.CONDUCT_MISSION:
            content = <ConductMission />;
            break;

        case gameStates.MISSION_OUTCOME:
            content = <MissionOutcome />;
            break;

        case gameStates.COMPLETED:
            content = <Completed />;
            break;

        default:
            content = null;
        }

        return <Scene>{content}</Scene>;
    }
}

Game.key = `GAME_KEY`;

export default Game;
