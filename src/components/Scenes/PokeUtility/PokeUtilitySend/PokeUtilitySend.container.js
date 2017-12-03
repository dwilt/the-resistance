import {
    connect,
} from 'react-redux';

import {
    getPokeUtilityAction as onPress,
} from '/store/pokeUtility/pokeUtility.actions';

import {
    pokeUtilityIsSendingSelector,
} from '/selectors';

import PokeUtilitySend from './PokeUtilitySend.component';

export default connect(state => {
    const isLoading = pokeUtilityIsSendingSelector(state);

    return {
        isLoading,
    };
}, {
    onPress,
})(PokeUtilitySend);
