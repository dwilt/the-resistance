import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { PlayersList } from 'components';

export default class MissionTeamVotePlayersList extends PureComponent {
    static propTypes = {
        players: PropTypes.array.isRequired,
    };

    render() {
        return <PlayersList {...this.props} theme={`underlined`} />;
    }
}
