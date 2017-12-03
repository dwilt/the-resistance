import {
    connect,
} from 'react-redux';

import {
    pokeUtilityErrorSelector,
} from '/selectors';

import PokeUtilityError from './PokeUtilityError.component';

export default connect(state => {
    const error = pokeUtilityErrorSelector(state);

    return {
        error,
    };
})(PokeUtilityError);
