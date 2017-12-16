import React, { Component } from "react";

import { Alert, View } from "react-native";

import PropTypes from "prop-types";

import { firebase, fireFetch, db } from "/services/index";

import { gameStates } from "../../../../../assets/gameStructure";

import { PlayerIdentityReveal } from "../PlayerIdentityReveal/index";
import { Lobby } from "../Lobby";
import { BuildMissionTeam } from "../BuildMissionTeam";
import { ConductMission } from "../ConductMission";
import { MissionOutcome } from "../MissionOutcome";
import { MissionTeamVote } from "../MissionTeamVote";
import { MissionTeamVoteOutcome } from "../MissionTeamVoteOutcome";

class Game extends Component {
    static propTypes = {
        gameId: PropTypes.string.isRequired,
        hostId: PropTypes.string,
        gameCode: PropTypes.number
    };

    state = {
        state: gameStates.Home,
        isQuitting: false,
        players: []
    };

    async componentDidMount() {
        const { gameId, gameCode } = this.props;

        if (gameCode) {
            Alert.alert(
                `Game Created!`,
                `Your game has been created and the code is ${gameCode}`
            );
        }

        this.playersListener = db
            .collection(`games`)
            .doc(gameId)
            .collection(`players`)
            .onSnapshot(({ docs }) => {
                this.setState({
                    players: docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                });
            });

        this.gameListener = db
            .collection(`games`)
            .doc(gameId)
            .onSnapshot(snapshot => {
                const data = snapshot.data();

                if (data) {
                    this.setState(data);
                }
            });
    }

    componentWillUnmount() {
        this.playersListener();
        this.gameListener();
    }

    render() {
        const userId = firebase.auth().currentUser.uid;

        const { gameId } = this.props;
        const { players = [], host, currentMission = {} } = this.state;

        const isHost = host === userId;

        const {
            missionTeamVotes = {},
            proposedTeam = {},
            missionTeam = {},
            leader
        } = currentMission;

        const { isSpy } = players.find(player => player.id === userId) || {};
        const isLeader = leader === userId;

        const lobby = (
            <Lobby gameId={gameId} players={players} isHost={isHost} />
        );

        switch (state) {
            case gameStates.PLAYER_IDENTITY_REVEAL: {
                return <PlayerIdentityReveal isSpy={isSpy} gameId={gameId} />;
            }

            case gameStates.BUILD_MISSION_TEAM: {
                const { members, filled } = proposedTeam;

                return (
                    <BuildMissionTeam
                        players={players}
                        isLeader={isLeader}
                        gameId={gameId}
                        members={members}
                        filled={filled}
                    />
                );
            }

            case gameStates.MISSION_TEAM_VOTE: {
                const { members, votingComplete } = proposedTeam;
                const proposedTeamMembers = players.filter(
                    ({ id }) => members.indexOf(id) !== -1
                );

                return (
                    <MissionTeamVote
                        isHost={isHost}
                        gameId={gameId}
                        proposedTeamMembers={proposedTeamMembers}
                        votingComplete={votingComplete}
                    />
                );
            }

            case gameStates.MISSION_TEAM_VOTE_OUTCOME: {
                const { approved } = missionTeamVotes;

                return (
                    <MissionTeamVoteOutcome
                        isHost={isHost}
                        gameId={gameId}
                        approved={approved}
                    />
                );
            }

            case gameStates.CONDUCT_MISSION: {
                const isMember = typeof missionTeam[userId] !== `undefined`;
                const voted =
                    isMember && typeof missionTeam[userId] === `boolean`;

                return (
                    <ConductMission
                        isSpy={isSpy}
                        gameId={gameId}
                        isMember={isMember}
                        voted={voted}
                    />
                );
            }

            case gameStates.MISSION_OUTCOME: {
                const { passed } = currentMission;

                return (
                    <MissionOutcome
                        gameId={gameId}
                        isHost={isHost}
                        passed={passed}
                    />
                );
            }

            default:
                return lobby;
        }
    }
}

Game.key = `GAME_KEY`;

export default Game;
