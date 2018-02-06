import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { PlayerIconList } from 'components';

export default class MissionTeamVotePlayersList extends PureComponent {
    static propTypes = {
        players: PropTypes.array.isRequired,
    };

    render() {
        return <PlayerIconList {...this.props} />;
    }
}
