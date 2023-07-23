import { createSlice } from "@reduxjs/toolkit";
import { SafeUser } from "../../types";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

// Define a type for the slice state
interface UserState {
  user: {
    name: string;
    email: string;
    role: string;
    brithDate?: string;
    address?: string;
    phoneNumber?: string;
  } | null;
}

// Define the initial state using that type
const initialState: SafeUser | null = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<SafeUser>) => {
      state = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user;

export default userSlice.reducer;
