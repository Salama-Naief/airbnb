import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

// Define a type for the slice state
interface Props {
  isOpen: boolean;
}

// Define the initial state using that type
const initialState: Props = {
  isOpen: false,
};

export const useRegisterSlice = createSlice({
  name: "useRegister",
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onClose, onOpen } = useRegisterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const useRegister = (state: RootState) => state.useRegister;

export default useRegisterSlice.reducer;
