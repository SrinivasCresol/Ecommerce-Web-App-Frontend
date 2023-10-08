import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer, { productsFetch } from "../Slices/ProductsSclice";
import CartReducer, { getTotals } from "../Slices/CartSlice";
import { productsApi } from "../Slices/ProductsApi";

const store = configureStore({
  reducer: {
    products: ProductsReducer,
    cart: CartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(productsFetch());
store.dispatch(getTotals())

export default store;
