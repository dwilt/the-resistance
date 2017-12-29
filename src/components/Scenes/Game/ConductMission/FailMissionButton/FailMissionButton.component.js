import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { ActionButton } from 'components';

export default class FailMissionButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
    };

    render() {
        return (
            <ActionButton
                {...this.props}
                theme={`bordered`}
            >{`Fail`}</ActionButton>
        );
    }
}
