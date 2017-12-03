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
} from './SimilarHouseholdsUsage.styles';

export default class SimilarHouseholdsUsage extends PureComponent {
    static propTypes = {
        usage: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
    };

    static defaultProps = {
        usage: 0,
        max: 1,
    }

    render() {
        const { usage,max } = this.props;

        return  (
            <HorizontalBar
                title={getLocalizedString(`myWater.comparison.similarHouseholds`)}
                value={usage}
                color={color}
                width={usage / max}
            />
        );
    }
}
