import { connect } from 'react-redux';

import { getLogOutAction as onPress } from 'store/user/user.actions';

import LogoutButton from './LogoutButton.component';

export default connect(null, {
    onPress,
})(LogoutButton);
