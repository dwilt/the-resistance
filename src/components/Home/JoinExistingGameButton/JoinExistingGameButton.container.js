import { connect } from "react-redux";

import { showJoinOverlayAction as onPress } from "store/home/home.actions";

import JoinExistingGameButton from "./JoinExistingGameButton.component";

export default connect(null, {
    onPress,
})(JoinExistingGameButton);
