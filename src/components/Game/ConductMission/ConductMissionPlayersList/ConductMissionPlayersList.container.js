import { connect } from "react-redux";

import { missionTeamPlayersSelector } from "selectors";

import ConductMissionPlayersList from "./ConductMissionPlayersList.component";

export default connect(state => {
    const players = missionTeamPlayersSelector(state);

    return {
        players,
    };
})(ConductMissionPlayersList);
