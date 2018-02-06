import { connect } from 'react-redux';

import {
    loginIsRegisteringSelector,
    loginShowingRegisterFormSelector,
} from 'selectors';

import { getRegisterOnPressAction as onPress } from 'store/login/login.actions';

import LoginRegisterButton from './LoginRegisterButton.component';

export default connect(
    (state) => {
        const isLoading = loginIsRegisteringSelector(state);
        const registering = loginShowingRegisterFormSelector(state);

        return {
            isLoading,
            registering,
        };
    },
    {
        onPress,
    },
)(LoginRegisterButton);
