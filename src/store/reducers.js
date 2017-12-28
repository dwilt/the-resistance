import {
    combineReducers,
} from 'redux';

import game from './game/game.reducer';
import home from './home/home.reducer';

export default combineReducers({
    game,
    home,
});
