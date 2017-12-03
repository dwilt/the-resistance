import {
    connect,
} from 'react-redux';

import {
    getMessageAction as onChangeText,
    getResetPokeUtilityAction as componentDidMount,
} from '/store/pokeUtility/pokeUtility.actions';

import {
    pokeUtilityMessageSelector,
} from '/selectors';

import PokeUtilityMessage from './PokeUtilityMessage.component';

export default connect(state => {
    const value = pokeUtilityMessageSelector(state);

    return {
        value,
    };
}, {
    onChangeText,
    componentDidMount,
})(PokeUtilityMessage);
