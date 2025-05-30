import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productsType, productsInterface } from "./types";
const initialState: productsInterface = {
  products: [],
  selectedProduct: null,
};

const ProductsSlice = createSlice({
  initialState: initialState,
  name: "Products slice",
  reducers: {
    setproducts(state, action: PayloadAction<productsType[]>) {
      state.products = action.payload;
    },
    setselectedProduct(state, action: PayloadAction<productsType>) {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setproducts, setselectedProduct } = ProductsSlice.actions;
export default ProductsSlice.reducer;
