import { connect } from 'react-redux';

import { isSpySelector, spiesSelector, userIdSelector } from 'selectors';

import { confirmPlayerIdentityAction as onConfirm } from 'store/buildMissionTeam/buildMissionTeam.actions';

import PlayerIdentityReveal from './PlayerIdentityReveal.component';

export default connect(
    (state) => {
        const spies = spiesSelector(state);
        const isSpy = isSpySelector(state);
        const userId = userIdSelector(state);

        return {
            spies,
            isSpy,
            userId,
        };
    },
    {
        onConfirm,
    },
)(PlayerIdentityReveal);
