import {
    conductingMissionAction,
    conductedMissionAction,
    selectingNewLeaderAction,
    selectedNewLeaderAction,
} from 'store/game/game.actions';

import {
    resetMissionTeamVote
} from 'store/missionTeamVote/missionTeamVote.actions';

import { put, takeEvery } from 'redux-saga/effects';

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

function* selectingNewLeader() {
    yield put(setIsSelectingNewLeaderAction(true));
    yield put(resetMissionTeamVote());
}

function* selectedNewLeader() {
    yield put(setIsSelectingNewLeaderAction(false));
}

function* conducting() {
    yield put(setIsConductingAction(true));
    yield put(resetMissionTeamVote());
}

function* conducted() {
    yield put(setIsConductingAction(false));
}

export default function*() {
    yield takeEvery(conductingMissionAction().type, conducting);
    yield takeEvery(conductedMissionAction().type, conducted);
    yield takeEvery(selectedNewLeaderAction().type, selectedNewLeader);
    yield takeEvery(selectingNewLeaderAction().type, selectingNewLeader);
}
