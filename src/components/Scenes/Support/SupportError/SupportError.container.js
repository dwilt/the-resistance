import {
    connect,
} from 'react-redux';

import {
    supportErrorSelector,
} from '/selectors';

import SupportError from './SupportError.component';

export default connect(state => {
    const error = supportErrorSelector(state);

    return {
        error,
    };
})(SupportError);
