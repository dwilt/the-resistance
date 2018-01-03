import React, { PureComponent } from 'react';

import { PlayingCard } from 'components';

const passedCard = require(`assets/images/pass-mission-card.png`);

export default class PassedMissionCard extends PureComponent {
    render() {
        return <PlayingCard source={passedCard} />;
    }
}
