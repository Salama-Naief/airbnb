import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

// Define the initial state using that type
const initialState: CartTypes[] = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartTypes>) => {
      state.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<CartTypes>) => {
      state = [];
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user;

export default cartSlice.reducer;
