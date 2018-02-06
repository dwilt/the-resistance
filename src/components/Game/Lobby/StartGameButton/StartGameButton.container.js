import { connect } from "react-redux";

import {
    enoughPlayersInGameSelector,
    lobbyIsStartingGameSelector,
} from "selectors";

import { startGameAction as onPress } from "store/lobby/lobby.actions";

import StartGameButton from "./StartGameButton.component";

export default connect(
    state => {
        const disabled = !enoughPlayersInGameSelector(state);
        const isLoading = lobbyIsStartingGameSelector(state);

        return {
            disabled,
            isLoading,
        };
    },
    {
        onPress,
    }
)(StartGameButton);
