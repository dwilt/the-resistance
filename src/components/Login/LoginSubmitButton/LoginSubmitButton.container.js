import { connect } from 'react-redux';

import {
    loginIsLoggingInSelector,
    loginShowingRegisterFormSelector,
    loginLoginFormIsValidSelector,
} from 'selectors';

import { getLoginOnPressAction as onPress } from 'store/login/login.actions';

import LoginSubmitButton from './LoginSubmitButton.component';

export default connect(
    (state) => {
        const isLoading = loginIsLoggingInSelector(state);
        const registering = loginShowingRegisterFormSelector(state);
        const disabled = !loginLoginFormIsValidSelector(state);

        return {
            isLoading,
            registering,
            disabled,
        };
    },
    {
        onPress,
    },
)(LoginSubmitButton);
