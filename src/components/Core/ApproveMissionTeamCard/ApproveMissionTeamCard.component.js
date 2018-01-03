import React, { PureComponent } from 'react';

import { Image } from 'react-native';

const approveCard = require(`assets/images/approve-mission-team-card.png`);

import styles from './ApproveMissionTeamCard.styles';

export default class ApproveMissionTeamCard extends PureComponent {
    render() {
        return <Image style={styles.image} source={approveCard} />;
    }
}
