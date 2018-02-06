import {
    setIsJoiningGameAction,
    setShowJoinOverlayAction,
    setIsCreatingGameAction,
    setHomeErrorAction,
    setJoinGameInputAction,
} from "./home.actions";

import { createReducer } from "helpers";

export default createReducer(
    {
        isJoiningGame: false,
        showJoinGameOverlay: false,
        isCreatingGame: false,
        error: ``,
        joinGameInput: ``,
    },
    {
        [setJoinGameInputAction().type]: (state, { joinGameInput }) => ({
            ...state,
            joinGameInput,
        }),
        [setHomeErrorAction().type]: (state, { error }) => ({
            ...state,
            error,
        }),
        [setIsCreatingGameAction().type]: (state, { isCreatingGame }) => ({
            ...state,
            isCreatingGame,
        }),
        [setIsJoiningGameAction().type]: (state, { isJoiningGame }) => ({
            ...state,
            isJoiningGame,
        }),
        [setShowJoinOverlayAction().type]: (
            state,
            { showJoinGameOverlay }
        ) => ({
            ...state,
            showJoinGameOverlay,
        }),
    }
);
