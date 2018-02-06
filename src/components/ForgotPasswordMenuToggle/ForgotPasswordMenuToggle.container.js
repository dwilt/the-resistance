import { connect } from 'react-redux';

import { forgotPasswordMenuIsOpenSelector } from 'selectors';

import { getToggleForgotPasswordMenuAction as onPress } from 'store/forgotPasswordMenu/forgotPasswordMenu.actions';

import ForgotPasswordMenuToggle from './ForgotPasswordMenuToggle.component';

export default connect(
    (state) => {
        const isOpen = forgotPasswordMenuIsOpenSelector(state);

        return {
            isOpen,
        };
    },
    {
        onPress,
    },
)(ForgotPasswordMenuToggle);
