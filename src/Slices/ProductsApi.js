import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../Services/Helper";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/` }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `get/products`,
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
