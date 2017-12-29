import {
    setGameIdAction,
    setGameDataAction,
    setGamePlayersAction,
    setGameCompletedMissionsAction,
    toggleMissionTeamMemberAction,
    confirmPlayerIdentityAction,
    setProposedMissionTeamApprovalAction,
} from 'store/game/game.actions';

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
        [setProposedMissionTeamApprovalAction().type]: (
            state,
            { userId, approves },
        ) => ({
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
        [setGameCompletedMissionsAction().type]: (
            state,
            { completedMissions },
        ) => ({
            ...state,
            completedMissions,
        }),
        [toggleMissionTeamMemberAction().type]: (
            state,
            { userId, selected },
        ) => ({
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
