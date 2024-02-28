import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSliceder from "./redux-toolkitt/Cart";
const rootReducer = combineReducers({
    cartSliceder
    
});
const store = configureStore({
    reducer: rootReducer,
});
export default store;