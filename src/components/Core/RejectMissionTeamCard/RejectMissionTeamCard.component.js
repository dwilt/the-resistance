import React, { PureComponent } from 'react';

import { Image } from 'react-native';

const rejectCard = require(`assets/images/reject-mission-team-card.png`);

import styles from './RejectMissionTeamCard.styles';

export default class RejectMissionTeamCard extends PureComponent {
    render() {
        return <Image style={styles.image} source={rejectCard} />;
    }
}
