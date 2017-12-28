import { connect } from 'react-redux';

import { joinGameAction as onPress } from 'store/game/game.actions';

import { setJoinGameInput as onChangeText } from 'store/home/home.actions';

import { homeJoinGameInputSelector } from 'selectors';

import JoinGameInput from './JoinGameInput.component';

export default connect(
    (state) => {
        const value = homeJoinGameInputSelector(state);

        return {
            value,
        };
    },
    {
        onPress,
        onChangeText,
    },
)(JoinGameInput);
