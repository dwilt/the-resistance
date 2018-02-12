import React, { PureComponent } from 'react';

import { PlayingCard } from 'components';

import PropTypes from 'prop-types';

const rejectCard = require(`assets/images/reject-mission-team-card.png`);

export default class RejectMissionTeamCard extends PureComponent {
    static propTypes = {
        width: PropTypes.number,
    };

    render() {
        const { width } = this.props;

        return <PlayingCard source={rejectCard} width={width} />;
    }
}
