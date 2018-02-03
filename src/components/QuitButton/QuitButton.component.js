import React, { PureComponent } from 'react';

import { ActionButton } from 'components';

import PropTypes from 'prop-types';

import { rsf, fireFetch } from 'services';

import { Actions } from 'react-native-router-flux';

export default class QuitButton extends PureComponent {
    static propTypes = {
        gameId: PropTypes.string.isRequired,
    };

    quitGame = async () => {
        const { gameId } = this.props;
        const userId = rsf.auth.currentUser.uid;

        try {
            this.setState({
                isQuitting: true,
            });

            await fireFetch(`quitGame`, {
                userId,
                gameId,
            });

            Actions.pop();
        } catch ({ message }) {
            this.setState({
                error: message,
            });
        } finally {
            this.setState({
                isQuitting: false,
            });
        }
    };

    render() {
        return (
            <ActionButton onPress={this.quitGame}>{`Quit Game`}</ActionButton>
        );
    }
}
