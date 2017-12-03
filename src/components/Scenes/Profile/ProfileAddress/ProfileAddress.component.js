import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    IconAndText,
} from '/components';

export default class ProfileAddress extends PureComponent {
    static propTypes = {
        street: PropTypes.string.isRequired,
        street2: PropTypes.string,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        zipCode: PropTypes.string.isRequired,
    };

    render() {
        const {
            street,
            street2,
            city,
            state,
            zipCode,
        } = this.props;
        const street2Text = street2 ? `${street2}\n` : ``;

        return (
            <IconAndText
                text={`${street}\n${street2Text}${city}, ${state} ${zipCode}`}
                maxWidth={false}
            />
        );
    }
}
