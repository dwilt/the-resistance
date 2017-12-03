import React, {
    PureComponent,
} from 'react';

import {
    InboxCardList,
    InboxList,
    Scene,
} from '/components';

import {
    getLocalizedString,
} from '/services/locale.service';

import styles from './Inbox.styles';

export default class Inbox extends PureComponent {
    render() {
        return (
            <Scene
                title={getLocalizedString(`inbox.title`)}
                style={styles.container}
            >
                <InboxCardList/>
                <InboxList/>
            </Scene>
        );
    }
}
