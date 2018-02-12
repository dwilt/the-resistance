import React, { PureComponent } from 'react';

import { PlayingCard } from 'components';

import PropTypes from 'prop-types';

const approveCard = require(`assets/images/approve-mission-team-card.png`);

export default class ApproveMissionTeamCard extends PureComponent {
    static propTypes = {
        width: PropTypes.number,
    };

    render() {
        const { width } = this.props;

        return <PlayingCard source={approveCard} width={width} />;
    }
}
