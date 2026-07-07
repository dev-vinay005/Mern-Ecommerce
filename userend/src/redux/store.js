import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice";
import productSliceReducer from "./slices/productSlice";
import cartSliceReducer from "./slices/cartSlice";
import orderSliceReducer from "./slices/orderSlice"

const store = configureStore({
  reducer: {
    authSlice: authSliceReducer,
    productSlice: productSliceReducer,
    cartSlice: cartSliceReducer,
    orderSlice: orderSliceReducer
  },
});

export default store;
