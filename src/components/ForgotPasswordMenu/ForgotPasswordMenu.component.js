import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { Text, Scene, ForgotPasswordMenuToggle } from 'components';

class ForgotPasswordMenu extends PureComponent {
    static propTypes = {};

    render() {
        const {} = this.props;

        return (
            <Scene menuToggle={<ForgotPasswordMenuToggle />}>
                <Text>Hey</Text>
            </Scene>
        );
    }
}

ForgotPasswordMenu.key = `ForgotPasswordMenu`;

export default ForgotPasswordMenu;
