import {
    connect,
} from 'react-redux';

import {
    getEmailAction as onChangeText,
} from '/store/pokeUtility/pokeUtility.actions';

import PokeUtilityEmail from './PokeUtilityEmail.component';

export default connect(null, {
    onChangeText,
})(PokeUtilityEmail);
