import {
    connect,
} from 'react-redux';

import {
    loginNameSelector,
    loginShowingRegisterFormSelector,
} from 'selectors';

import {
    setNameAction as onChangeText,
} from 'store/login/login.actions';

import LoginName from './LoginName.component';

export default connect(state => {
    const value = loginNameSelector(state);
    const show = loginShowingRegisterFormSelector(state);

    return {
        value,
        show,
    };
}, {
    onChangeText,
})(LoginName);
