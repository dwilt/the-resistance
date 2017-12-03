import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    getLocalizedString,
} from '/services/locale.service';

import {
    TextInput,
} from '/components';

import styles from './UtilityPickerZipCode.styles';

export default class UtilityPickerZipCode extends PureComponent {
    static propTypes = {
        onChangeText: PropTypes.func.isRequired,
        onSubmitEditing: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
    };

    render() {
        return (
            <TextInput
                {...this.props}
                autoFocus={true}
                keyboardType={`numeric`}
                placeholder={getLocalizedString(`utilityPicker.zipCode`)}
                returnKeyType={`search`}
                style={styles.container}
            />
        );
    }
}
