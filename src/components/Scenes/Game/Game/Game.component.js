import React, { Component } from "react";

import { Alert } from "react-native";

import PropTypes from "prop-types";

import { firebase, db } from "/services";

import {
    BuildMissionTeam,
    Completed,
    ConductMission,
    Lobby,
    MissionOutcome,
    MissionTeamVote,
    MissionTeamVoteOutcome,
    PlayerIdentityReveal,
} from "/components";

import { gameStates } from "../../../../../firebaseFunctions/gameStructure";

class Game extends Component {
    static propTypes = {
        gameId: PropTypes.string.isRequired,
        hostId: PropTypes.string,
        gameCode: PropTypes.number,
    };

    state = {
        state: gameStates.LOBBY,
        isQuitting: false,
        players: [],
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
                    players: docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    })),
                });
            });

        this.gameListener = db
            .collection(`games`)
            .doc(gameId)
            .onSnapshot((snapshot) => {
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
        const {
            players,
            host,
            currentMission = {},
            victoryType,
            state,
        } = this.state;

        const isHost = host === userId;

        const {
            missionTeamVotes = {},
            proposedTeam = {},
            missionTeam = {},
            leader,
        } = currentMission;

        const { isSpy } = players.find((player) => player.id === userId) || {};
        const isLeader = leader === userId;

        switch (state) {
            case gameStates.LOBBY: {
                return (
                    <Lobby gameId={gameId} players={players} isHost={isHost} />
                );
            }

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
                const { members } = proposedTeam;
                const { votingComplete, votes = {} } = missionTeamVotes;
                const submittedVote = typeof votes[userId] !== `undefined`;
                const proposedTeamMembers = players.filter(
                    ({ id }) => members.indexOf(id) !== -1
                );

                return (
                    <MissionTeamVote
                        isHost={isHost}
                        gameId={gameId}
                        proposedTeamMembers={proposedTeamMembers}
                        votingComplete={votingComplete}
                        submittedVote={submittedVote}
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

            case gameStates.COMPLETED: {
                return <Completed victoryType={victoryType} />;
            }
        }
    }
}

Game.key = `GAME_KEY`;

export default Game;
