import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer, { productsFetch } from "../Slices/ProductsSclice";
import CartReducer, { getTotals } from "../Slices/CartSlice";
import { productsApi } from "../Slices/ProductsApi";
import authReducer from "../Slices/authSlice";

const store = configureStore({
  reducer: {
    products: ProductsReducer,
    auth: authReducer,
    cart: CartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(productsFetch());
store.dispatch(getTotals());

export default store;
