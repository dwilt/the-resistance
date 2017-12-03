import {
    connect,
} from 'react-redux';

import {
    getSubmitOnPressAction as onPress,
} from '/store/register/register.actions';

import {
    registerIsRegisteringSelector,
    registerFormIsValidSelector,
} from '/selectors';

import RegisterSubmitButton from './RegisterSubmitButton.component';

export default connect(state => {
    const isRegistering = registerIsRegisteringSelector(state);
    const formIsValid = registerFormIsValidSelector(state);

    return {
        isRegistering,
        formIsValid,
    };
}, {
    onPress,
})(RegisterSubmitButton);
