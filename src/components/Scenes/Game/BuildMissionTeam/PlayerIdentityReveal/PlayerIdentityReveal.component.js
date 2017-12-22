import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { ActionButton, Text, PlayerCard, Checkbox } from 'components';

import { firebase, fireFetch } from 'services';
import { View } from 'react-native';
import styles from './PlayerIdentityReveal.styles';

class PlayerIdentityReveal extends Component {
    static propTypes = {
        isSpy: PropTypes.bool.isRequired,
        spies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        gameId: PropTypes.string.isRequired,
        onConfirmIdentity: PropTypes.func.isRequired,
    };

    state = {
        showingIdentity: false,
        isConfirming: false,
        waitingForOthers: false,
        confirmedAlone: false,
    };

    showIdentity = () => {
        this.setState({
            showingIdentity: true,
        });
    };

    onConfirmAloneToggle = (confirmedAlone) => {
        this.setState({
            confirmedAlone,
        });
    };

    confirmPlayerIdentity = async () => {
        const { gameId, onConfirmIdentity } = this.props;
        const userId = firebase.auth().currentUser.uid;

        onConfirmIdentity();

        try {
            this.setState({
                isConfirming: true,
            });

            await fireFetch(`confirmPlayerIdentity`, {
                userId,
                gameId,
            });
        } catch ({ message }) {
            this.setState({
                error: message,
            });
        }
    };

    render() {
        const { isSpy, spies } = this.props;
        const { isConfirming, showingIdentity, confirmedAlone } = this.state;

        let content = null;

        if (showingIdentity) {
            const identityText = isSpy ? `You're a spy!` : `You're an ally!`;
            let spiesText =
                isSpy &&
                spies.reduce(
                    (currentText, spy, i) =>
                        i === spies.length - 1
                            ? `${currentText} and ${spy}.`
                            : `${currentText} ${spy}, `,
                    `The other spies you’re working with are`,
                );
            const spiesTextEl = spiesText && (
                <Text style={styles.spiesText}>{spiesText}</Text>
            );

            content = (
                <View>
                    <Text style={styles.title}>{identityText}</Text>
                    {spiesTextEl}
                    <View style={styles.identityCard}>
                        <PlayerCard isSpy={isSpy} />
                    </View>
                    <ActionButton
                        isLoading={isConfirming}
                        onPress={this.confirmPlayerIdentity}
                    >
                        {`Got It!`}
                    </ActionButton>
                </View>
            );
        } else {
            content = (
                <View>
                    <Text
                        style={styles.subtitle}
                    >{`Check the box to confirm you’re phone is hidden`}</Text>
                    <View style={styles.aloneCheckbox}>
                        <Checkbox
                            checked={confirmedAlone}
                            label={`No players can see my phone`}
                            onValueChange={this.onConfirmAloneToggle}
                        />
                    </View>
                    <ActionButton
                        theme={`teal`}
                        onPress={this.showIdentity}
                        disabled={!confirmedAlone}
                    >
                        {`Reveal My Identity`}
                    </ActionButton>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>{content}</View>
            </View>
        );
    }
}

export default PlayerIdentityReveal;
