import React, {
    PureComponent,
} from 'react';

import {
    CompleteSetUpButton,
    Scene,
    Text,
} from '/components';

import {
    getLocalizedString,
} from '/services/locale.service';

import styles from './CompletedSetUp.styles';

export default class CompletedSetUp extends PureComponent {
    render() {
        return (
            <Scene
                title={getLocalizedString(`completedSetUp.title`)}
                compact={true}
                whiteBg={true}
            >
                <Text style={styles.instructions}>{getLocalizedString(`completedSetUp.instructions`)}</Text>
                <CompleteSetUpButton/>
            </Scene>
        );
    }
}
