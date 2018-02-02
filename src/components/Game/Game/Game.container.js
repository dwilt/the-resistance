import { connect } from 'react-redux';

import { gameStateSelector } from 'selectors';

import Game from './Game.component';

export default connect((st) => {
    const state = gameStateSelector(st);

    return {
        state,
    };
})(Game);
