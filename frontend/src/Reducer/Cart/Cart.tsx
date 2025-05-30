import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
export interface CartInterface {
  title: string;
  quantity: number;
}

const initialState: CartInterface = {
  title: "",
  quantity: 0,
};

const Cartslice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setQuantity(state, action: PayloadAction<number>) {
      state.quantity = action.payload;
    },
  },
});

export const { setTitle, setQuantity } = Cartslice.actions;
export default Cartslice.reducer;

export const getTitle = (state: RootState) => {
  return state.cart.title;
};
export const getquantity = (state: RootState) => {
  return state.cart.quantity;
};
