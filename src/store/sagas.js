import { all } from 'redux-saga/effects';

import buildMissionTeamSaga from 'store/buildMissionTeam/buildMissionTeam.actions';
import gameSaga from 'store/game/game.actions';
import homeSaga from 'store/home/home.actions';
import missionTeamVoteSaga from 'store/missionTeamVote/missionTeamVote.actions';
import missionTeamVoteApprovedSaga from 'store/missionTeamVoteApproved/missionTeamVoteApproved.actions';
import userSaga from 'store/user/user.actions';

export default function* sagas() {
    yield all([
        buildMissionTeamSaga(),
        gameSaga(),
        missionTeamVoteSaga(),
        missionTeamVoteApprovedSaga(),
        userSaga(),
        homeSaga(),
    ]);
}
