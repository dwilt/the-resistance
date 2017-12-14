import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { ActionButton } from '../../../Core/ActionButton';

import { firebase, fireFetch } from '/services';
import { View } from 'react-native';
import { Text } from '../../../Core/Text';
import styles from './PlayerReveal.styles';

class PlayerReveal extends Component {
    static propTypes = {
        isSpy: PropTypes.bool.isRequired,
        gameId: PropTypes.string.isRequired,
    };

    state = {
        showingIdentity: false,
        isConfirming: false,
        waitingForOthers: false,
    };

    showIdentity = () => {
        this.setState({
            showingIdentity: true,
        });
    };

    confirmPlayerIdentity = async () => {
        const { gameId } = this.props;
        const userId = firebase.auth().currentUser.uid;

        try {
            this.setState({
                isConfirming: true,
            });

            const { showWaiting } = await fireFetch(`confirmPlayerIdentity`, {
                userId,
                gameId,
            });

            if (showWaiting) {
                this.setState({
                    showWaiting,
                });
            }
        } catch ({ message }) {
            this.setState({
                error: message,
            });
        } finally {
            this.setState({
                isConfirming: false,
            });
        }
    };

    render() {
        const { isSpy } = this.props;
        const { isConfirming, waitingForOthers, showingIdentity } = this.state;

        const identityText = isSpy ? `You are a spy` : `You are an ally`;
        const identityEl = showingIdentity && <Text>{identityText}</Text>;

        const buttonEl = showingIdentity ? (
            <ActionButton
                isLoading={isConfirming}
                onPress={this.confirmPlayerIdentity}
            >
                {`Got It!`}
            </ActionButton>
        ) : (
            <ActionButton onPress={this.showIdentity}>
                {`Reveal My Identity`}
            </ActionButton>
        );

        const bottomElement = waitingForOthers ? (
            <Text>{`Waiting for other players...`}</Text>
        ) : (
            buttonEl
        );

        return (
            <View style={styles.container}>
                {identityEl}
                {bottomElement}
            </View>
        );
    }
}

export default PlayerReveal;
