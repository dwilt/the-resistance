import React, {
    PureComponent,
} from 'react';

import {
    HouseholdAttributes,
    HouseholdSetUpNextButton,
    Scene,
    Text,
} from '/components';

import {
    getLocalizedString,
} from '/services/locale.service';

import styles from './HouseholdSetUp.styles';

export default class HouseholdSetUp extends PureComponent {
    render() {
        return (
            <Scene
                title={getLocalizedString(`householdSetUp.title`)}
                whiteBg={true}
                compact={true}
            >
                <Text style={styles.instructions}>{getLocalizedString(`householdSetUp.instructions`)}</Text>
                <HouseholdAttributes/>
                <HouseholdSetUpNextButton/>
            </Scene>
        );
    }
}
