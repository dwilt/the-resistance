import { connect } from 'react-redux';

import { forgotPasswordMenuErrorSelector } from 'selectors';

import ForgotPasswordError from './ForgotPasswordError.component';

export default connect((state) => {
    const error = forgotPasswordMenuErrorSelector(state);

    return {
        error,
    };
})(ForgotPasswordError);
