import {createReducer, createAction} from "@reduxjs/toolkit";

export const storeMenuList = createAction('STORE_MENU_LIST');
export const setTable = createAction('SET_TABLE');

const myMenu = {
    list: {},
    table: null,
}

const MyMenuReducer = createReducer(myMenu, (builder) => {
    builder
        .addCase(storeMenuList, (state, action) => {
            state.list = action.payload;
        })
        .addCase(setTable, (state, action) => {
            state.table = action.payload;
        })
})

export default MyMenuReducer;