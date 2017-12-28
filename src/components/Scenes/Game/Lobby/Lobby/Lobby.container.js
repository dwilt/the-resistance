import { connect } from 'react-redux';

import { gameHostSelector, userIdSelector } from 'selectors';

import Lobby from './Lobby.component';

export default connect((st) => {
    const userId = userIdSelector(st);
    const host = gameHostSelector(st);

    return {
        host,
        userId,
    };
})(Lobby);
