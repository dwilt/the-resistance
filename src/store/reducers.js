import { combineReducers } from 'redux';

import game from './game/game.reducer';
import home from './home/home.reducer';
import missionTeamVote from './missionTeamVote/missionTeamVote.reducer';
import user from './user/user.reducer';

export default combineReducers({
    game,
    home,
    missionTeamVote,
    user,
});
