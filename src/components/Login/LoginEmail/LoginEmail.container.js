import { connect } from 'react-redux';

import { loginEmailSelector } from 'selectors';

import { setEmailAction as onChangeText } from 'store/login/login.actions';

import LoginEmail from './LoginEmail.component';

export default connect(
    (state) => {
        const value = loginEmailSelector(state);

        return {
            value,
        };
    },
    {
        onChangeText,
    },
)(LoginEmail);
