import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    HorizontalBar,
} from '/components';

import {
    getLocalizedString,
} from '/services/locale.service';

import {
    color,
} from './EfficientHouseholdsUsage.styles';

export default class EfficientHouseholdsUsage extends PureComponent {
    static propTypes = {
        max: PropTypes.number.isRequired,
        usage: PropTypes.number.isRequired,
    };

    static defaultProps = {
        usage: 0,
        max: 1,
    }

    render() {
        const { usage,max } = this.props;

        return (
            <HorizontalBar
                title={getLocalizedString(`myWater.comparison.efficientHouseholds`)}
                value={usage}
                color={color}
                width={usage / max}
            />
        );
    }
}
