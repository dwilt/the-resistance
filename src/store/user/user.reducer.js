import {
    setUserAction,
} from './user.actions';

import {
    createReducer,
} from 'helpers';

export default createReducer(null,{
    [setUserAction().type]: (state, { user }) => user,
});