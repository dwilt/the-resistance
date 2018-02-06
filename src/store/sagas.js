import { all } from 'redux-saga/effects';

import buildMissionTeamSaga from 'store/buildMissionTeam/buildMissionTeam.actions';
import conductMissionSaga from 'store/conductMission/conductMission.actions';
import lobbySaga from 'store/lobby/lobby.actions';
import loginSaga from 'store/login/login.actions';
import homeSaga from 'store/home/home.actions';
import menuSaga from 'store/menu/menu.actions';
import missionOutcomeSaga from 'store/missionOutcome/missionOutcome.actions';
import missionTeamVoteSaga from 'store/missionTeamVote/missionTeamVote.actions';
import missionTeamVoteApprovedSaga from 'store/missionTeamVoteOutcome/missionTeamVoteOutcome.actions';
import userSaga from 'store/user/user.actions';

export default function* sagas() {
    yield all([
        buildMissionTeamSaga(),
        conductMissionSaga(),
        lobbySaga(),
        loginSaga(),
        menuSaga(),
        missionOutcomeSaga(),
        missionTeamVoteSaga(),
        missionTeamVoteApprovedSaga(),
        userSaga(),
        homeSaga(),
    ]);
}
