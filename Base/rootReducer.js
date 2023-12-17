import baseReducer from "./reducers/baseReducer";

const rootReducer = (state = {}, action) => ({
    base: baseReducer(state.base, action),
})

export default rootReducer;