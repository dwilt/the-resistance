import React, { PureComponent } from 'react';

import { PlayingCard } from 'components';

const rejectCard = require(`assets/images/reject-mission-team-card.png`);

export default class RejectMissionTeamCard extends PureComponent {
    render() {
        return <PlayingCard source={rejectCard} />;
    }
}
