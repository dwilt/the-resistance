import { connect } from "react-redux";

import {
    missionPassedSelector,
    isHostSelector,
    missionFailedVotesSelector,
    missionPassedVotesSelector,
} from "selectors";

import MissionOutcome from "./MissionOutcome.component";

export default connect(state => {
    const passed = missionPassedSelector(state);
    const isHost = isHostSelector(state);
    const totalPassedVotes = missionPassedVotesSelector(state);
    const totalFailedVotes = missionFailedVotesSelector(state);

    return {
        passed,
        isHost,
        totalPassedVotes,
        totalFailedVotes,
    };
})(MissionOutcome);
