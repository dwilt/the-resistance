import React, {
    PureComponent,
} from 'react';

import {
    RebatesList,
    Scene,
} from '/components';

import {
    getLocalizedString,
} from '/services/locale.service';

export default class Rebates extends PureComponent {
    render() {
        return (
            <Scene
                isModal={true}
                title={getLocalizedString(`rebates.title`)}
                whiteBg={true}
            >
                <RebatesList/>
            </Scene>
        );
    }
}
