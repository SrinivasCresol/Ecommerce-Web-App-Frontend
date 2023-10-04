import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {},
    decreaseCart(state, action) {},
    removeCart(state, action) {},
    getTotalCart(state, action) {},
    clearCart(state, action) {},
  },
});

export const { addToCart, decreaseCart, removeCart, getTotalCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
