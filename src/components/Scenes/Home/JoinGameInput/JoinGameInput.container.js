import { connect } from 'react-redux';

import { joinGameAction as onPress } from 'store/game/game.actions';

import { setJoinGameInputAction as onChangeText } from 'store/home/home.actions';

import { joinGameInputSelector } from 'selectors';

import JoinGameInput from './JoinGameInput.component';

export default connect(
    (state) => {
        const value = joinGameInputSelector(state);

        return {
            value,
        };
    },
    {
        onPress,
        onChangeText,
    },
)(JoinGameInput);
