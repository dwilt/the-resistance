import { combineReducers } from 'redux';

import buildMissionTeam from './buildMissionTeam/buildMissionTeam.reducer';
import conductMission from './conductMission/conductMission.reducer';
import forgotPasswordMenu from './forgotPasswordMenu/forgotPasswordMenu.reducer';
import game from './game/game.reducer';
import gameMenu from './gameMenu/gameMenu.reducer';
import home from './home/home.reducer';
import lobby from './lobby/lobby.reducer';
import login from './login/login.reducer';
import missionOutcome from './missionOutcome/missionOutcome.reducer';
import missionTeamVote from './missionTeamVote/missionTeamVote.reducer';
import missionTeamVoteOutcome from './missionTeamVoteOutcome/missionTeamVoteOutcome.reducer';
import user from './user/user.reducer';

export default combineReducers({
    buildMissionTeam,
    conductMission,
    forgotPasswordMenu,
    game,
    gameMenu,
    home,
    lobby,
    login,
    missionOutcome,
    missionTeamVote,
    missionTeamVoteOutcome,
    user,
});
