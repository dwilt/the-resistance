import React, {
    PureComponent,
} from 'react';

import {
    KeyboardAvoidingView,
} from 'react-native';

import {
   getLocalizedString,
} from '/services/locale.service';

import {
    PokeUtilityEmail,
    PokeUtilityError,
    PokeUtilityMessage,
    PokeUtilityName,
    PokeUtilitySend,
    Scene,
    Text,
} from '/components';

import styles from './PokeUtility.styles';

export default class PokeUtility extends PureComponent {
    render() {
        return (
            <Scene
                title={getLocalizedString(`pokeUtility.title`)}
                whiteBg={true}
                compact={true}
            >
                <KeyboardAvoidingView
                    behavior={`position`}
                    contentContainerStyle={styles.container}
                >
                    <Text style={styles.instructions}>
                        {getLocalizedString(`pokeUtility.instructions`)}
                    </Text>
                    <PokeUtilityError/>
                    <PokeUtilityName/>
                    <PokeUtilityEmail/>
                    <PokeUtilityMessage/>
                    <PokeUtilitySend/>
                </KeyboardAvoidingView>
            </Scene>
        );
    }
}
