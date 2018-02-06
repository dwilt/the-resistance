import React, { PureComponent } from "react";

import { Image } from "react-native";

import PropTypes from "prop-types";

const spyCard = require(`assets/images/spy-card.png`);
const allyCard = require(`assets/images/ally-card.png`);

import styles from "./PlayerCard.styles";

export default class PlayerCard extends PureComponent {
    static propTypes = {
        isSpy: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        isSpy: false,
    };

    render() {
        const { isSpy } = this.props;

        return (
            <Image source={isSpy ? spyCard : allyCard} style={styles.card} />
        );
    }
}
