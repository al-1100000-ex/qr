import {createReducer, createAction} from "@reduxjs/toolkit";

export const baseAction = createAction('BASE_ACTION');

const base = {
    test: null,
}

const baseReducer = createReducer(base, (builder) => {
    builder
        .addCase(baseAction, (state, action) => {
            state.test = action.payload;
        })
})

export default baseReducer;