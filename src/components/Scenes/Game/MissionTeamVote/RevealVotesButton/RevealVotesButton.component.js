import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { ActionButton } from 'components';

export default class RevealVotesButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        disabled: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <ActionButton
                {...this.props}
                theme={`teal`}
            >{`Reveal Outcome`}</ActionButton>
        );
    }
}
