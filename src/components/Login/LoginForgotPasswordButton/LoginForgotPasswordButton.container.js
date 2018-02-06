import { connect } from 'react-redux';

import {} from 'selectors/index';

import { getForgotPasswordOnPressAction as onPress } from 'store/login/login.actions';

import LoginForgotPasswordButton from './LoginForgotPasswordButton.component';

export default connect(null, {
    onPress,
})(LoginForgotPasswordButton);
