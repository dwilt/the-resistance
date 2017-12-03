import React, {
    PureComponent,
} from 'react';

import {
    Icon,
} from '/components';

import {
    size,
    color,
} from './XIcon.styles';

import PropTypes from 'prop-types';

// console.log(Icon); // TODO: undefined... wtf?

export default class XIcon extends PureComponent {
    static propTypes = {
        size: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
    };

    static defaultProps = {
        size: size,
        color: color,
    };

    render() {
        return (
            <Icon
                {...this.props}
                name={`cross2`}
            />
        );
    }
}
