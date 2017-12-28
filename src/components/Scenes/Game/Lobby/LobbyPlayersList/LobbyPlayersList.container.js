import { connect } from 'react-redux';

import { gamePlayersSelector } from 'selectors';

import LobbyPlayersList from './LobbyPlayersList.component';

export default connect((st) => {
    const players = gamePlayersSelector(st);

    return {
        players,
    };
})(LobbyPlayersList);
