import React, {
    PureComponent,
} from 'react';

import {
    LogoutButton,
    MyAccountCardList,
    Scene,
} from '/components';

import {
    getLocalizedString,
} from '/services/locale.service';

export default class MyAccount extends PureComponent {
    static propTypes = {};

    render() {
        return (
            <Scene
                title={getLocalizedString(`myAccount.title`)}
            >
                <MyAccountCardList/>
                <LogoutButton/>
            </Scene>
        );
    }
}
