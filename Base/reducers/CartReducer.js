import {createReducer, createAction} from "@reduxjs/toolkit";

export const addToCart = createAction('ADD_TO_CART');
export const deleteCartItem = createAction('DELETE_CART_ITEM');

const cart = {
    list : {},
    count: 0,
}

const CartReducer = createReducer(cart, (builder) => {
    builder
        .addCase(addToCart, (state, action) => {
            if(!state.list[action.payload.type_id]) {
                state.list[action.payload.type_id] = {
                    ID  : action.payload.type_id,
                    Type: action.payload.item.Type,
                }
            }
            if(!state.list[action.payload.type_id].Items) {
                state.list[action.payload.type_id].Items = {};
            }
            if(!state.list[action.payload.type_id].Items[action.payload.item.ID]) {
                state.list[action.payload.type_id].Items[action.payload.item.ID] = {...action.payload.item, Amount: 1};
                state.count++;
            }else{
                state.list[action.payload.type_id].Items[action.payload.item.ID]['Amount'] = Number(state.list[action.payload.type_id].Items[action.payload.item.ID].Amount) + 1;
                state.count++;
            }
        })
        .addCase(deleteCartItem, (state, action) => {
            if(Object.keys(state.list[action.payload.type_id].Items).length > 1) {
                if(Number(state.list[action.payload.type_id].Items[action.payload.ID]?.Amount) > 1) {
                    state.list[action.payload.type_id].Items[action.payload.ID].Amount = Number(state.list[action.payload.type_id].Items[action.payload.ID].Amount) - 1;
                } else{
                    delete state.list[action.payload.type_id].Items[action.payload.ID];
                }
                state.count--;
            }else{
                if(Number(state.list[action.payload.type_id].Items[action.payload.ID]?.Amount) > 1) {
                    state.list[action.payload.type_id].Items[action.payload.ID].Amount = Number(state.list[action.payload.type_id].Items[action.payload.ID].Amount) - 1;
                } else{
                    delete state.list[action.payload.type_id];
                }
                state.count--;
            }
        })
})

export default CartReducer;