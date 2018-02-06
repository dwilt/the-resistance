import { connect } from "react-redux";

import { showJoinGameOverlaySelector } from "selectors";

import Home from "./Home.component";

export default connect(state => {
    const showJoinGameOverlay = showJoinGameOverlaySelector(state);

    return {
        showJoinGameOverlay,
    };
})(Home);
