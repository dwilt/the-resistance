import React, {
    PureComponent,
} from 'react';

import {
    Scene,
    TipsList,
} from '/components';

import {
    getLocalizedString,
} from '/services/locale.service';

export default class Tips extends PureComponent {
    render() {
        return (
            <Scene
                isModal={true}
                title={getLocalizedString(`tips.title`)}
                whiteBg={true}
            >
                <TipsList/>
            </Scene>
        );
    }
}
