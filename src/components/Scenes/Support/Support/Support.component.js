import React, {
    PureComponent,
} from 'react';

import {
    IconAndText,
    Scene,
    SupportError,
    SupportMessageInput,
    SupportSendButton,
} from '/components';

import {
    KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';

import {
    getLocalizedString,
} from '/services/locale.service';

import {
    extraScrollHeight,
} from './Support.styles';

export default class Support extends PureComponent {
    render() {
        return (
            <Scene
                title={getLocalizedString(`support.title`)}
                isModal={true}
            >
                <KeyboardAwareScrollView
                    extraScrollHeight={extraScrollHeight}
                >
                    <IconAndText
                        icon={`bubble-question`}
                        text={getLocalizedString(`support.subtitle`)}
                    />
                    <SupportError/>
                    <SupportMessageInput/>
                    <SupportSendButton/>
                </KeyboardAwareScrollView>
            </Scene>
        );
    }
}
