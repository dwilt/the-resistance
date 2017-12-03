import React, {
    PureComponent,
} from 'react';

import {
    CardList,
} from '/components';

import PropTypes from 'prop-types';

export default class UtilityPickerList extends PureComponent {
    static propTypes = {
        utilities: PropTypes.array.isRequired,
        showResults: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    render() {
        const { utilities, onPress, showResults } = this.props;

        return showResults ? (
            <CardList
                cards={utilities.map(({ utilityId: id, name, city, state: utilityState }) => ({
                    id,
                    title: name,
                    subtitle: `${city}, ${utilityState}`,
                    onPress: () => onPress(id),
                }))}
            />
        ) : null;
    }
}
