import { connect } from 'react-redux';

import { leaderNameSelector } from 'selectors';

import MissionLeader from './MissionLeader.component';

export default connect((st) => {
    const leader = leaderNameSelector(st);

    return {
        leader,
    };
})(MissionLeader);
