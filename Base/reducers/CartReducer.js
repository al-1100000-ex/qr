import {createReducer, createAction} from "@reduxjs/toolkit";

export const addToCart = createAction('ADD_TO_CART');

const cart = {
    list : {},
    count: 0,
}

const CartReducer = createReducer(cart, (builder) => {
    builder
        .addCase(addToCart, (state, action) => {
            state.list[action.payload.type_id] = {
                ID  : action.payload.type_id,
                Type: action.payload.item.Type,
                Items: {
                    [action.payload.item.ID]: action.payload.item,
                }
            }
            state.count++;
        })
})

export default CartReducer;