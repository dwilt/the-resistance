import { connect } from 'react-redux';

import { playersSelector } from 'selectors';

import LobbyPlayersList from './LobbyPlayersList.component';

export default connect((st) => {
    const players = playersSelector(st);

    return {
        players,
    };
})(LobbyPlayersList);
