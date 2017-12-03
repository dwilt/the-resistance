import {
    connect,
} from 'react-redux';

import {
    forgotPasswordErrorSelector,
} from '/selectors';

import ForgotPasswordError from './ForgotPasswordError.component';

export default connect(st => {
    const error = forgotPasswordErrorSelector(st);

    return {
        error,
    };
})(ForgotPasswordError);
