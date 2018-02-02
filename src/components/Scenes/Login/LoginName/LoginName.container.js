import {
    connect,
} from 'react-redux';

import {
    loginNameSelector,
    loginShowRegisterSelector
} from 'selectors';

import {
    setNameAction as onChangeText
} from 'store/login/login.actions';

import LoginName from './LoginName.component';

export default connect(state => {
    const value = loginNameSelector(state);
    const show = loginShowRegisterSelector(state);

    return {
        value,
        show
    };
}, {
    onChangeText
})(LoginName);
