import React, {
    PureComponent,
} from 'react';

import {
    View,
} from 'react-native';

import {
    Scene,
    Text,
} from '/components';

import {
    getLocalizedString,
} from '/services/locale.service';

import styles from './UtilityNotFound.styles.js';

export default class UtilityNotFound extends PureComponent {
    render() {
        return (
            <Scene
                title={getLocalizedString(`utilityNotFound.title`)}
                compact={true}
                whiteBg={true}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>{getLocalizedString(`utilityNotFound.nextSteps`)}</Text>
                    <Text style={styles.text}>{getLocalizedString(`utilityNotFound.thankYou`)}</Text>
                </View>
            </Scene>
        );
    }
}
