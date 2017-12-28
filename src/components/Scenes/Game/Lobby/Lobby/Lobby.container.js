import { connect } from 'react-redux';

import { isHostSelector, userIdSelector } from 'selectors';

import Lobby from './Lobby.component';

export default connect((st) => {
    const isHost = isHostSelector(st);

    return {
        isHost,
    };
})(Lobby);
