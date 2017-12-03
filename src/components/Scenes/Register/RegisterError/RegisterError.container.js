import {
    connect,
} from 'react-redux';

import {
    registerErrorSelector,
} from '/selectors';

import RegisterError from './RegisterError.component';

export default connect(state => {
    const error = registerErrorSelector(state);

    return {
        error,
    };
})(RegisterError);
