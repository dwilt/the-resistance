import {
    setIsConfirmingAction,
} from './buildMissionTeam.actions';

import {
    createReducer,
} from 'helpers';

export default createReducer({
    isConfirming: false,
},{
    [setIsConfirmingAction().type]: (state, { isConfirming }) => ({
        ...state,
        isConfirming,
    }),
});