import { setIsConfirmingAction, setConfirmedIdentityAction } from './buildMissionTeam.actions';

import { createReducer } from 'helpers';

export default createReducer(
    {
        isConfirming: false,
        confirmedIdentity: false,
    },
    {
        [setConfirmedIdentityAction().type]: (state, { confirmedIdentity }) => ({
            ...state,
            confirmedIdentity,
        }),
        [setIsConfirmingAction().type]: (state, { isConfirming }) => ({
            ...state,
            isConfirming,
        }),
    },
);
