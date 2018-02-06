import { connect } from "react-redux";

import { leaderNameSelector, gameStateSelector } from "selectors";

import MissionLeader from "./MissionLeader.component";

export default connect(st => {
    const leader = leaderNameSelector(st);
    const gameState = gameStateSelector(st);

    return {
        leader,
        gameState,
    };
})(MissionLeader);
