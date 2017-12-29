import { connect } from 'react-redux';

import { showJoinGameOverlaySelector } from 'selectors';

import { hideJoinOverlayAction as onHide } from 'store/home/home.actions';

import JoinGameOverlay from './JoinGameOverlay.component';

export default connect(
    (state) => {
        const show = showJoinGameOverlaySelector(state);

        return {
            show,
        };
    },
    {
        onHide,
    },
)(JoinGameOverlay);
