import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer, { productsFetch } from "../Slices/ProductsSclice";
import CartSlice from "../Slices/CartSlice";

const store = configureStore({
  reducer: {
    products: ProductsReducer,
    cart: CartSlice,
  },
});

store.dispatch(productsFetch());

export default store;
