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
      state.status = "Pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "Success";
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "Rejected";
    },
  },
});

export default ProductsSlice.reducer;
