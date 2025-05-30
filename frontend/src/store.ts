// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Reducer/Products/ProductsSlice";
import LoginReducer from "./Reducer/Login/LoginSlice";
import cartReducer from "./Reducer/Cart/Cart";
const store = configureStore({
  reducer: {
    //add reducers here
    product: productReducer,
    Login: LoginReducer,
    cart: cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
