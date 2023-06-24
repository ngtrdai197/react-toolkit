import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "./product.interface";

export interface IProductState {
  products: IProduct[];
}

const initialState: IProductState = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
    },
  },
});

export const { setProducts, addProduct } = productSlice.actions;

export default productSlice.reducer;
