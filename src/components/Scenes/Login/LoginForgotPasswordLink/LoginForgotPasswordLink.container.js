import {
    connect,
} from 'react-redux';

import {
    getForgotPasswordOnPressAction as onPress,
} from '/store/login/login.actions';

import LoginForgotPasswordLink from './LoginForgotPasswordLink.component';

export default connect(null, {
    onPress,
})(LoginForgotPasswordLink);
