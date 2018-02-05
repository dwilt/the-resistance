import { call, put, select, takeEvery } from 'redux-saga/effects';
import { approvesProposedMissionTeamSelector, gameIdSelector, userIdSelector } from "../../selectors";
import { fireFetch } from "../../services";

export const setCastVoteAction = (castVote) => ({
    type: `SET_MISSION_TEAM_VOTE_CAST_VOTE`,
    payload: {
        castVote,
    },
});

export const setIsRevealingAction = (isRevealing) => ({
    type: `SET_MISSION_TEAM_VOTE_IS_REVEALING`,
    payload: {
        isRevealing,
    },
});

export const resetMissionTeamVote = () => ({
    type: `RESET_MISSION_TEAM_VOTE`,
});

export const revealProposedMissionTeamVoteAction = () => ({
    type: `REVEAL_PROPOSED_MISSION_TEAM_VOTE`,
});

export const setProposedMissionTeamApprovalAction = (userId, approves) => ({
    type: `SET_PROPOSED_MISSION_TEAM_APPROVAL`,
    payload: {
        userId,
        approves,
    },
});

export const submitProposedMissionTeamApprovalAction = () => ({
    type: `SUBMIT_PROPOSED_MISSION_TEAM_APPROVAL`,
});

export const retractProposedMissionTeamApprovalAction = () => ({
    type: `RETRACT_PROPOSED_MISSION_TEAM_APPROVAL`,
});

export const approveProposedMissionTeamAction = () => setCastVoteAction(true);

export const rejectProposedMissionTeamAction = () => setCastVoteAction(false);

function* submitProposedMissionTeamApproval() {
    const userId = yield select(userIdSelector);
    const gameId = yield select(gameIdSelector);
    const approves = yield select(approvesProposedMissionTeamSelector);

    yield put(setProposedMissionTeamApprovalAction(userId, approves));

    yield call(fireFetch, `submitProposedMissionTeamApproval`, {
        userId,
        gameId,
        approves,
    });
}

function* retractProposedMissionTeamApproval() {
    const userId = yield select(userIdSelector);
    const gameId = yield select(gameIdSelector);

    yield put(setProposedMissionTeamApprovalAction(userId));

    yield call(fireFetch, `retractProposedMissionTeamApproval`, {
        userId,
        gameId,
    });
}

function* resetVote() {
    yield put(setCastVoteAction(null));
}

function* revealProposedMissionTeamVote() {
    const gameId = yield select(gameIdSelector);

    yield put(setIsRevealingAction(true));

    yield call(fireFetch, `revealProposedMissionTeamVote`, {
        gameId,
    });

    yield put(setIsRevealingAction(false));
}

export default function*() {
    yield takeEvery(revealProposedMissionTeamVoteAction().type, revealProposedMissionTeamVote);
    yield takeEvery(resetMissionTeamVote().type, resetVote);
    yield takeEvery(submitProposedMissionTeamApprovalAction().type, submitProposedMissionTeamApproval);
    yield takeEvery(retractProposedMissionTeamApprovalAction().type, retractProposedMissionTeamApproval);
}
