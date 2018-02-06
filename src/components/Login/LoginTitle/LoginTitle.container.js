import { connect } from 'react-redux';

import { loginShowingRegisterFormSelector } from 'selectors';

import { getToggleLoginRegisterAction as toggleForm } from 'store/login/login.actions';

import LoginTitle from './LoginTitle.component';

export default connect(
    (state) => {
        const isRegistering = loginShowingRegisterFormSelector(state);

        return {
            isRegistering,
        };
    },
    {
        toggleForm,
    },
)(LoginTitle);
