import React, {
    PureComponent,
} from 'react';

import {
    ScrollView,
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    UtilityPickerError,
    UtilityPickerList,
    UtilityPickerSearchButton,
    UtilityPickerZipCode,
    UtilityPickerUtilityNotFoundButton,
    Scene,
} from '/components';

import {
   getLocalizedString,
} from '/services/locale.service';

import styles from './UtilityPicker.styles';

export default class UtilityPicker extends PureComponent {
    static propTypes = {
        reset: PropTypes.func.isRequired,
    };

    componentWillUnmount() {
        const { reset } = this.props;

        reset();
    }

    render() {

        return (
            <Scene
                title={getLocalizedString(`utilityPicker.title`)}
                compact={true}
                whiteBg={true}
                scrollContent={false}
            >
                <View style={styles.container}>
                    <UtilityPickerError/>
                    <View style={styles.inputAndButtonContainer}>
                        <UtilityPickerZipCode/>
                        <UtilityPickerSearchButton/>
                    </View>
                    <ScrollView style={styles.results}>
                        <UtilityPickerList/>
                        <UtilityPickerUtilityNotFoundButton/>
                    </ScrollView>
                </View>
            </Scene>
        );
    }
}
