import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    TextButton,
} from '/components';

import {
    getLocalizedString,
} from '/services/locale.service';

export default class UtilityPickerUtilityNotFoundButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        showResults: PropTypes.bool.isRequired,
    };

    render() {
        const { showResults, onPress } = this.props;

        return showResults ? (
            <TextButton
                onPress={onPress}
            >
                {getLocalizedString(`utilityPicker.utilityNotFoundButton`)}
            </TextButton>
        ) : null;
    }
}
