import { connect } from 'react-redux';

import { showJoinGameOverlaySelector } from 'selectors';

import JoinGameOverlay from './JoinGameOverlay.component';

export default connect(
    (state) => {
        const show = showJoinGameOverlaySelector(state);

        return {
            show,
        };
    }
)(JoinGameOverlay);
