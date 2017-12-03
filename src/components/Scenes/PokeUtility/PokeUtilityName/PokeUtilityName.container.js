import {
    connect,
} from 'react-redux';

import {
    getNameAction as onChangeText,
} from '/store/pokeUtility/pokeUtility.actions';

import PokeUtilityName from './PokeUtilityName.component';

export default connect(null, {
    onChangeText,
})(PokeUtilityName);
