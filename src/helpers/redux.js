import isObject from "is-object";

export const createReducer = (initialState, actions = {}) => {
    let is = initialState;

    if (Array.isArray(initialState)) {
        is = [...initialState];
    } else if (isObject(initialState)) {
        is = { ...initialState };
    }

    return (state = is, { type, payload }) => {
        const reducerAction = actions[type];

        return reducerAction ? reducerAction(state, payload) : state;
    };
};
