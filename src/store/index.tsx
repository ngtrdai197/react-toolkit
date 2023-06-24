import productSlice from "@/features/product/product.slice";
import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "@services/product.service";

export const store = configureStore({
  reducer: {
    product: productSlice,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
