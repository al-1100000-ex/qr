import {createReducer, createAction} from "@reduxjs/toolkit";

export const baseAction = createAction('BASE_ACTION');
export const toggleBackButton = createAction('TOGGLE_BACK_BUTTON');
export const setScanned = createAction('SET_SCANNED');
export const setDirectToComp = createAction('SET_DIRECT_TO_COMP');

const base = {
    backButton: false,
    scanned   : false,
    directToComp: '',
}

const baseReducer = createReducer(base, (builder) => {
    builder
        .addCase(baseAction, (state, action) => {
            state.test = action.payload;
        })
        .addCase(toggleBackButton, (state) => {
            state.scanned = false;
            state.backButton = !state.backButton;
        })
        .addCase(setScanned, (state, action) => {
            if (!!action.payload.scanned) {
                state.scanned = action.payload.scanned;
            } else {
                state.scanned = !state.scanned;
            }
        })
        .addCase(setDirectToComp, (state, action) => {
            state.directToComp = action.payload;
        })
})

export default baseReducer;