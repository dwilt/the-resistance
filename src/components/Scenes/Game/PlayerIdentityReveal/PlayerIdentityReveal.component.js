import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { ActionButton, Text } from 'components';

import { firebase, fireFetch } from '/services';
import { Image, View } from 'react-native';
import styles from './PlayerIdentityReveal.styles';

const spyCard = require(`../../../../assets/images/spy-card.png`);
const allyCard = require(`../../../../assets/images/ally-card.png`);

class PlayerIdentityReveal extends Component {
    static propTypes = {
        confirmedIdentity: PropTypes.bool.isRequired,
        isSpy: PropTypes.bool.isRequired,
        spies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
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
        const { isSpy, spies, confirmedIdentity } = this.props;
        const { isConfirming, showingIdentity } = this.state;

        let content = <Text>{`Waiting for other players...`}</Text>;

        if (!confirmedIdentity) {
            const identityText = isSpy ? `You're a spy!` : `You're an ally!`;

            const titleText = showingIdentity
                ? identityText
                : `Reveal Your Identity`;

            let subtitleText =
                isSpy && showingIdentity
                    ? spies.reduce(
                          (currentText, spy, i) =>
                              i === spies.length - 1
                                  ? `${currentText} and ${spy}`
                                  : `${currentText} ${spy}, `,
                          `You’re working with `,
                      )
                    : `Remember to keep this hidden at all times!`;

            const card = isSpy ? spyCard : allyCard;

            const identityCard = showingIdentity && (
                <Image source={card} style={styles.identityCard} />
            );

            const buttonEl = showingIdentity ? (
                <ActionButton
                    isLoading={isConfirming}
                    onPress={this.confirmPlayerIdentity}
                >
                    {`Got It!`}
                </ActionButton>
            ) : (
                <ActionButton theme={`teal`} onPress={this.showIdentity}>
                    {`Reveal My Identity`}
                </ActionButton>
            );

            content = (
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>{titleText}</Text>
                    {identityCard}
                    <Text style={styles.subtitle}>{subtitleText}</Text>
                    {buttonEl}
                </View>
            );
        }

        return <View style={styles.container}>{content}</View>;
    }
}

export default PlayerIdentityReveal;
