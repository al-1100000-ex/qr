import baseReducer from "./reducers/baseReducer";
import CartReducer from "./reducers/CartReducer";
import MyMenuReducer from "./reducers/MyMenuReducer";

const rootReducer = (state = {}, action) => ({
    base  : baseReducer(state.base, action),
    cart  : CartReducer(state.cart, action),
    myMenu: MyMenuReducer(state.myMenu, action),
})

export default rootReducer;