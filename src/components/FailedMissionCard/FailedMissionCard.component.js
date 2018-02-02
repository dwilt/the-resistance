import React, { PureComponent } from 'react';

import { PlayingCard } from 'components';

const failedCard = require(`assets/images/fail-mission-card.png`);

export default class FailedMissionCard extends PureComponent {
    render() {
        return <PlayingCard source={failedCard} />;
    }
}
