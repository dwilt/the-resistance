import { connect } from 'react-redux';

import { userDisplayNameSelector } from 'selectors';

import Header from './Header.component';

export default connect((state) => {
    const username = userDisplayNameSelector(state);

    return {
        username,
    };
})(Header);
