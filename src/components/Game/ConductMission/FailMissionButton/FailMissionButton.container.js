import { connect } from "react-redux";

import { failMissionAction as onPress } from "store/conductMission/conductMission.actions";

import { failsMissionSelector } from "selectors";

import FailMissionButton from "./FailMissionButton.component";

export default connect(
    state => {
        const selected = failsMissionSelector(state);

        return {
            selected,
        };
    },
    {
        onPress,
    }
)(FailMissionButton);
