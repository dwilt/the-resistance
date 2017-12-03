import React, {
    PureComponent,
} from 'react';

import {
    Icon,
} from '/components';

import PropTypes from 'prop-types';

import {
    size,
    color,
} from './ChevronIcon.styles';

export default class ChevronIcon extends PureComponent {
    static propTypes = {
        size: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        direction: PropTypes.oneOf([
            `left`,
            `right`,
        ]),
    };

    static defaultProps = {
        direction: `left`,
        size: size,
        color: color,
    };

    render() {
        const { direction } = this.props;
        const name = `chevron-${direction}`;

        return (
            <Icon
                {...this.props}
                name={name}
            />
        );
    }
}
