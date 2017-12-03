import React, {
    PureComponent,
} from 'react';

import PropTypes from 'prop-types';

import {
    Loader,
} from '/components';

import {
    states,
} from '/store/myWater/myWater.actions';

export default class MyWaterActivityIndicator extends PureComponent {
    static propTypes = {
        state: PropTypes.oneOf(
            Object.keys(states).map(key => states[key])
        ).isRequired,
    };

    render() {
        const { state } = this.props;
        const show = state === states.loading;

        return show ? (
            <Loader/>
        ) : null;
    }
}
