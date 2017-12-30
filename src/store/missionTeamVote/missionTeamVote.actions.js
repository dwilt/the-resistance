import {
    revealingProposedMissionTeamVoteAction,
    revealedProposedMissionTeamVoteAction,
} from 'store/game/game.actions';

import { put, takeEvery } from 'redux-saga/effects';

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

export const approveProposedMissionTeamAction = () => setCastVoteAction(true);

export const rejectProposedMissionTeamAction = () => setCastVoteAction(false);

function* revealing() {
    yield put(setIsRevealingAction(true));
}

function* revealed() {
    yield put(setIsRevealingAction(false));
}

export default function*() {
    yield takeEvery(revealingProposedMissionTeamVoteAction().type, revealing);
    yield takeEvery(revealedProposedMissionTeamVoteAction().type, revealed);
}
