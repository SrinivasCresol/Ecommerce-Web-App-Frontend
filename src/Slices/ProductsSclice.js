import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductsFunction } from "../Services/Apis";

const initialState = {
  items: [],
  state: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    const response = await getProductsFunction();
    return response.data;
  }
);

const ProductsSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export default ProductsSlice.reducer;
