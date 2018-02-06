import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { MenuToggle } from 'components';

export default class ForgotPasswordMenuToggle extends PureComponent {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    render() {
        return <MenuToggle {...this.props} />;
    }
}
