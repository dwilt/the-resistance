import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    getLocalizedString,
} from '/services/locale.service';

import {
    ActionButton,
} from '/components';

import styles from './UtilityPickerSearchButton.styles';

export default class UtilitySearchButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        formIsValid: PropTypes.bool.isRequired,
        isSearching: PropTypes.bool.isRequired,
    };

    render() {
        const { onPress, isSearching, formIsValid } = this.props;

        return (
            <ActionButton
                onPress={onPress}
                isLoading={isSearching}
                disabled={isSearching || !formIsValid}
                style={styles.container}
            >
                {getLocalizedString(`utilityPicker.searchButton`)}
            </ActionButton>
        );
    }
}
