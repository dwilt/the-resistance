import React, {
    PureComponent,
} from 'react';

import {
    View,
} from 'react-native';

import {
    KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';

import PropTypes from 'prop-types';

import {
    DismissKeyboardView,
    RegisterAccountId,
    RegisterAccountName,
    RegisterEmail,
    RegisterError,
    RegisterPassword,
    RegisterSubmitButton,
    Scene,
    Text,
} from '/components';

import {
    getLocalizedString,
} from '/services/locale.service';

import styles, {
    extraScrollHeight,
} from './Register.styles';

export default class Register extends PureComponent {
    static propTypes = {
        utilityName: PropTypes.string.isRequired,
    };

    render() {
        const { utilityName } = this.props;

        return (
            <Scene
                title={getLocalizedString(`register.title`)}
                compact={true}
                whiteBg={true}
                style={styles.container}
            >
                <KeyboardAwareScrollView
                    extraScrollHeight={extraScrollHeight}
                >
                    <DismissKeyboardView>
                        <View>
                            <Text style={styles.instructions}>
                                {getLocalizedString(`register.instructions`, {
                                    utilityName,
                                })}
                            </Text>
                            <RegisterError/>
                            <RegisterEmail/>
                            <RegisterPassword/>
                            <RegisterAccountId/>
                            <RegisterAccountName/>
                            <RegisterSubmitButton/>
                        </View>
                    </DismissKeyboardView>
                </KeyboardAwareScrollView>
            </Scene>
        );
    }
}
