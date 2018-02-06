import { connect } from "react-redux";

import { hideJoinOverlayAction as onPress } from "store/home/home.actions";

import CancelJoinGame from "./CancelJoinGame.component";

export default connect(null, {
    onPress,
})(CancelJoinGame);
