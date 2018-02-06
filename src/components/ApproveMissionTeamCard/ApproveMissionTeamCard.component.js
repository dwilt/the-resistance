import React, { PureComponent } from "react";

import { PlayingCard } from "components";

const approveCard = require(`assets/images/approve-mission-team-card.png`);

export default class ApproveMissionTeamCard extends PureComponent {
    render() {
        return <PlayingCard source={approveCard} />;
    }
}
