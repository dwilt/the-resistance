import { combineReducers } from 'redux';

import buildMissionTeam from './buildMissionTeam/buildMissionTeam.reducer';
import conductMission from './conductMission/conductMission.reducer';
import game from './game/game.reducer';
import home from './home/home.reducer';
import missionOutcome from './missionOutcome/missionOutcome.reducer';
import missionTeamVote from './missionTeamVote/missionTeamVote.reducer';
import missionTeamVoteApproved from './missionTeamVoteApproved/missionTeamVoteApproved.reducer';
import user from './user/user.reducer';

export default combineReducers({
    buildMissionTeam,
    conductMission,
    game,
    home,
    missionOutcome,
    missionTeamVote,
    missionTeamVoteApproved,
    user,
});
