import { IProduct } from "@/features/product/product.interface";
import { addProduct, setProducts } from "@/features/product/productSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/products/" }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => "",
      transformResponse: (response: IProduct[]) => response || [],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setProducts(result.data));
        } catch (error) {
          // TODO: should handle error
        }
      },
    }),
    addProduct: builder.mutation<IProduct, IProduct>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: IProduct) => response || [],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addProduct(data));
        } catch (error) {
          // TODO: should handle error
        }
      },
    }),
  }),
});

export const { useGetProductsQuery, useAddProductMutation } = productApi;
