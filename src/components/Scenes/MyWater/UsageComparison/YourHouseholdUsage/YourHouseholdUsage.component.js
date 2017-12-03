import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    getLocalizedString,
} from '/services/locale.service';

import {
    HorizontalBar,
} from '/components';

export default class YourHouseholdUsage extends PureComponent {
    static propTypes = {
        usage: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
    };

    static defaultProps = {
        usage: 0,
        max: 1,
    };

    render() {
        const { usage,max } = this.props;

        return (
            <HorizontalBar
                title={getLocalizedString(`myWater.comparison.yourHousehold`)}
                value={usage}
                width={usage / max}
            />
        );
    }
}
