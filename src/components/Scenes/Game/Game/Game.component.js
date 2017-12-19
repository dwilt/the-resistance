import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { firebase, db } from '/services';

import {
    BuildMissionTeam,
    Completed,
    ConductMission,
    Lobby,
    MissionOutcome,
    MissionTeamVote,
    MissionTeamVoteOutcome,
    PlayerIdentityReveal,
    Scene,
} from 'components';

import { gameStates } from '../../../../../firebaseFunctions/gameStructure';

class Game extends Component {
    static propTypes = {
        gameId: PropTypes.string.isRequired,
        hostId: PropTypes.string,
        gameCode: PropTypes.string.isRequired,
    };

    state = {
        state: gameStates.LOBBY,
        isQuitting: false,
        players: [],
        roundNumber: 1
    };

    async componentDidMount() {
        const { gameId } = this.props;

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

        this.playersListener = db
            .collection(`games`)
            .doc(gameId)
            .collection(`completedMissions`)
            .onSnapshot(({ docs }) => {
                console.log('disd', docs);
                this.setState({
                    roundNumber: docs.length + 1
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

        const { gameId, gameCode} = this.props;

        const {
            players,
            host,
            currentMission = {},
            victoryType,
            state,
            roundNumber,
        } = this.state;

        const isHost = host === userId;

        const {
            missionTeamVotes = {},
            proposedTeam = {},
            missionTeam = {},
            leader,
        } = currentMission;

        const { isSpy, confirmedIdentity } =
            players.find((player) => player.id === userId) || {};
        const isLeader = leader === userId;

        let gameScene = null;

        switch (state) {
            case gameStates.LOBBY: {
                gameScene = (
                    <Lobby
                        gameCode={gameCode}
                        gameId={gameId}
                        players={players}
                        isHost={isHost}
                    />
                );
                break;
            }

            case gameStates.PLAYER_IDENTITY_REVEAL: {
                const spies = players
                    .filter(({ isSpy }) => isSpy)
                    .map(({ name }) => name);

                gameScene = (
                    <PlayerIdentityReveal
                        spies={spies}
                        isSpy={isSpy}
                        gameId={gameId}
                        confirmedIdentity={!!confirmedIdentity}
                    />
                );
                break;
            }

            case gameStates.BUILD_MISSION_TEAM: {
                const { members, filled } = proposedTeam;
                const leader = players.find(({ id }) => id === host);

                gameScene = (
                    <BuildMissionTeam
                        players={players}
                        isLeader={isLeader}
                        gameId={gameId}
                        members={members}
                        filled={filled}
                        leader={leader.name}
                        roundNumber={roundNumber}
                    />
                );
                break;
            }

            case gameStates.MISSION_TEAM_VOTE: {
                const { members } = proposedTeam;
                const { votingComplete, votes = {} } = missionTeamVotes;
                const submittedVote = typeof votes[userId] !== `undefined`;
                const proposedTeamMembers = players.filter(
                    ({ id }) => members.indexOf(id) !== -1,
                );

                gameScene = (
                    <MissionTeamVote
                        isHost={isHost}
                        gameId={gameId}
                        proposedTeamMembers={proposedTeamMembers}
                        votingComplete={votingComplete}
                        submittedVote={submittedVote}
                    />
                );
                break;
            }

            case gameStates.MISSION_TEAM_VOTE_OUTCOME: {
                const { approved } = missionTeamVotes;

                gameScene = (
                    <MissionTeamVoteOutcome
                        isHost={isHost}
                        gameId={gameId}
                        approved={approved}
                    />
                );
                break;
            }

            case gameStates.CONDUCT_MISSION: {
                const isMember = typeof missionTeam[userId] !== `undefined`;
                const voted =
                    isMember && typeof missionTeam[userId] === `boolean`;

                gameScene = (
                    <ConductMission
                        isSpy={isSpy}
                        gameId={gameId}
                        isMember={isMember}
                        voted={voted}
                    />
                );
                break;
            }

            case gameStates.MISSION_OUTCOME: {
                const { passed } = currentMission;

                gameScene = (
                    <MissionOutcome
                        gameId={gameId}
                        isHost={isHost}
                        passed={passed}
                    />
                );
                break;
            }

            case gameStates.COMPLETED: {
                gameScene = <Completed victoryType={victoryType} />;
                break;
            }
        }

        return <Scene>{gameScene}</Scene>;
    }
}

Game.key = `GAME_KEY`;

export default Game;
