import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
    BuildMissionTeam,
    Completed,
    ConductMission,
    Lobby,
    MissionOutcome,
    MissionTeamVote,
    MissionTeamVoteApproved,
    MissionTeamVoteRejected,
    Scene,
} from 'components';

import { gameStates } from '../../../../gameStructure';

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

            case gameStates.MISSION_TEAM_VOTE_APPROVED:
                content = <MissionTeamVoteApproved />;
                break;

            case gameStates.MISSION_TEAM_VOTE_REJECTED:
                content = <MissionTeamVoteRejected />;
                break;

            case gameStates.CONDUCT_MISSION:
                content = <ConductMission />;
                break;

            default:
                content = null;
        }

        return <Scene>{content}</Scene>;
    }
}

Game.key = `GAME_KEY`;

export default Game;
