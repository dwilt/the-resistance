import {
    connect,
} from 'react-redux';

import {
    getRegisterOnPressAction as onPress,
} from '/store/login/login.actions';

import LoginRegisterButton from './LoginRegisterButton.component';

export default connect(null, {
    onPress,
})(LoginRegisterButton);
