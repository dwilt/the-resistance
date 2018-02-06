import React, { PureComponent } from 'react';

import { ActionButton } from 'components/index';

import PropTypes from 'prop-types';

export default class QuitGameButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
    };

    render() {
        return (
            <ActionButton
                {...this.props}
                theme={`teal`}
            >Quit Game</ActionButton>
        );
    }
}
