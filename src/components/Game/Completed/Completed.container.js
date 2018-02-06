import { connect } from "react-redux";

import { victoryTypeSelector, spiesSelector } from "selectors";

import Completed from "./Completed.component";

export default connect(state => {
    const victoryType = victoryTypeSelector(state);
    const spies = spiesSelector(state);

    return {
        victoryType,
        spies,
    };
})(Completed);
