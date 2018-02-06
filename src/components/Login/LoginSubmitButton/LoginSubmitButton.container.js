import { connect } from 'react-redux';

import {
    loginIsLoggingInSelector,
    loginShowingRegisterFormSelector,
} from 'selectors';

import { getLoginOnPressAction as onPress } from 'store/login/login.actions';

import LoginSubmitButton from './LoginSubmitButton.component';

export default connect(
    (state) => {
        const isLoading = loginIsLoggingInSelector(state);
        const registering = loginShowingRegisterFormSelector(state);

        return {
            isLoading,
            registering,
        };
    },
    {
        onPress,
    },
)(LoginSubmitButton);
