import { setUserAction, setIsLoggedInAction } from "./user.actions";

import { createReducer } from "helpers";

export default createReducer(
    {
        isLoggedIn: false,
        user: null,
    },
    {
        [setUserAction().type]: (state, { user }) => ({
            ...state,
            user,
        }),
        [setIsLoggedInAction().type]: (state, { isLoggedIn }) => ({
            ...state,
            isLoggedIn,
        }),
    }
);
