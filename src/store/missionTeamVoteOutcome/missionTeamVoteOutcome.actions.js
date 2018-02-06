import {
    resetMissionTeamVote,
} from 'store/missionTeamVote/missionTeamVote.actions';

import { call, put, select, takeEvery } from 'redux-saga/effects';
import { gameIdSelector } from "selectors";
import { fireFetch } from "services";

export const setIsConductingAction = (isConducting) => ({
    type: `SET_MISSION_TEAM_VOTE_OUTCOME_IS_CONDUCTING`,
    payload: {
        isConducting,
    },
});

export const setIsSelectingNewLeaderAction = (isSelectingNewLeader) => ({
    type: `SET_MISSION_TEAM_VOTE_OUTCOME_IS_SELECTING_NEW_LEADER`,
    payload: {
        isSelectingNewLeader,
    },
});

export const conductMissionAction = () => ({
    type: `CONDUCT_MISSION`,
});

export const selectNewLeaderAction = () => ({
    type: `SELECT_NEW_LEADER`,
});

function* conductMission() {
    const gameId = yield select(gameIdSelector);

    yield put(setIsConductingAction(true));
    yield put(resetMissionTeamVote());

    yield call(fireFetch, `conductMission`, {
        gameId,
    });

    yield put(setIsConductingAction(false));
}

function* selectNewLeader() {
    const gameId = yield select(gameIdSelector);

    yield put(setIsSelectingNewLeaderAction(true));
    yield put(resetMissionTeamVote());

    yield call(fireFetch, `buildNewMissionTeam`, {
        gameId,
    });

    yield put(setIsSelectingNewLeaderAction(false));
}

export default function*() {
    yield takeEvery(conductMissionAction().type, conductMission);
    yield takeEvery(selectNewLeaderAction().type, selectNewLeader);
}
