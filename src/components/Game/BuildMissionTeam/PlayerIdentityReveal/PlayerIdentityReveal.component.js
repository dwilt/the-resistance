import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
    ActionButton,
    Text,
    PlayerCard,
    Checkbox,
    StartGameCountdown,
} from 'components';

import { View } from 'react-native';

import { createCommaSentenceFromArray } from 'helpers';

import styles from './PlayerIdentityReveal.styles';

export default class PlayerIdentityReveal extends Component {
    static propTypes = {
        userId: PropTypes.string.isRequired,
        onConfirm: PropTypes.func.isRequired,
        isSpy: PropTypes.bool.isRequired,
        spies: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            }),
        ).isRequired,
    };

    startingCountdown = 3;

    state = {
        countdownCount: 3,
        showingIdentity: false,
        confirmedAlone: false,
    };

    componentDidMount() {
        let iterations = 0;

        const countDown = setInterval(() => {
            this.setState(({ countdownCount }) => ({
                countdownCount: (countdownCount -= 1),
            }));

            iterations += 1;

            if (iterations >= this.startingCountdown) {
                clearInterval(countDown);
            }
        }, 1000);
    }

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

    render() {
        const { isSpy, spies, onConfirm, userId } = this.props;
        const { showingIdentity, confirmedAlone, countdownCount } = this.state;

        const otherSpies = spies
            .filter(({ id }) => id !== userId)
            .map(({ name }) => name);

        let content = null;

        if (showingIdentity) {
            const identityText = isSpy ? `You're a spy!` : `You're an ally!`;

            let spiesText =
                isSpy &&
                `The other spies you’re working with are ${createCommaSentenceFromArray(
                    otherSpies,
                )}`;

            if (otherSpies.length === 1) {
                spiesText = `${
                    otherSpies[0]
                } is the other spy you are working with.`;
            }

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
                    <ActionButton onPress={onConfirm}>Got It!</ActionButton>
                </View>
            );
        } else if (countdownCount) {
            content = <StartGameCountdown count={countdownCount} />;
        } else {
            content = (
                <View>
                    <Text style={styles.subtitle}>
                        Check the box to confirm you’re phone is hidden
                    </Text>
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
