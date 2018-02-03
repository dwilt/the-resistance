import {
    setGameIdAction,
    setGameDataAction,
    setGamePlayersAction,
    setGameCompletedMissionsAction,
} from 'store/game/game.actions';

import {
    toggleMissionTeamMemberAction,
    confirmPlayerIdentityAction,
    setConfirmedPlayerIdentityAction,
} from 'store/buildMissionTeam/buildMissionTeam.actions';

import {
    setProposedMissionTeamApprovalAction
} from 'store/missionTeamVote/missionTeamVote.actions';

import {
    setMissionPassesAction
} from 'store/conductMission/conductMission.actions';

import { createReducer } from 'helpers';

export default createReducer(
    {
        id: null,
        players: [],
        completedMissions: [],
        data: {
            allPlayersConfirmedIdentity: false,
            currentMission: {
                missionTeamVotes: {},
                proposedTeam: [],
            },
        },
    },
    {
        [setConfirmedPlayerIdentityAction().type]: (state, { userId }) => ({
            ...state,
            players: [
                ...state.players.filter(({ id }) => id !== userId),
                {
                    ...state.players.find(({ id }) => id === userId),
                    confirmedIdentity: true,
                },
            ],
        }),
        [setMissionPassesAction().type]: (state, { userId, passes }) => ({
            ...state,
            data: {
                ...state.data,
                currentMission: {
                    ...state.data.currentMission,
                    missionTeam: {
                        ...state.data.currentMission.missionTeam,
                        [userId]: passes,
                    },
                },
            },
        }),
        [setProposedMissionTeamApprovalAction().type]: (state,
                                                        { userId, approves },) => ({
            ...state,
            data: {
                ...state.data,
                currentMission: {
                    ...state.data.currentMission,
                    missionTeamVotes: {
                        ...state.data.currentMission.missionTeamVotes,
                        [userId]: approves,
                    },
                },
            },
        }),
        [confirmPlayerIdentityAction().type]: (state) => ({
            ...state,
            data: {
                ...state.data,
                allPlayersConfirmedIdentity: true,
            },
        }),
        [setGameIdAction().type]: (state, { id }) => ({
            ...state,
            id,
        }),
        [setGameDataAction().type]: (state, { data }) => ({
            ...state,
            data,
        }),
        [setGamePlayersAction().type]: (state, { players }) => ({
            ...state,
            players,
        }),
        [setGameCompletedMissionsAction().type]: (state,
                                                  { completedMissions },) => ({
            ...state,
            completedMissions,
        }),
        [toggleMissionTeamMemberAction().type]: (state,
                                                 { userId, selected },) => ({
            ...state,
            data: {
                ...state.data,
                currentMission: {
                    ...(state.data.currentMission || {}),
                    proposedTeam: selected
                        ? [
                            ...(state.data.currentMission.proposedTeam || []),
                            userId,
                        ]
                        : state.data.currentMission.proposedTeam.filter(
                            (id) => id !== userId,
                        ),
                },
            },
        }),
    },
);
