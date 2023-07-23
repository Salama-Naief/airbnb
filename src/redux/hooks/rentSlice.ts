import { createSlice } from "@reduxjs/toolkit";
import { RentTypes, LocationType } from "@/types/index";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

// Define a type for the slice state

interface CoutersProps {
  name: "roomCount" | "guestCount" | "bathroomCount";
  type: "decrease" | "increase";
}
interface TextValuesProps {
  name: "category" | "imageSrc" | "title" | "description";
  value: string;
}
// Define the initial state using that type
const initialState: RentTypes = {
  category: "",
  location: undefined,
  guestCount: 1,
  roomCount: 1,
  bathroomCount: 1,
  imageSrc: "",
  price: 1,
  title: "",
  description: "",
  type: "create",
  listingId: "",
};

export const userSlice = createSlice({
  name: "rent",
  initialState,
  reducers: {
    addRentTextValues: (state, action: PayloadAction<TextValuesProps>) => {
      state[action.payload.name] = action.payload.value;
    },
    addLocation: (state, action: PayloadAction<LocationType>) => {
      state.location = action.payload;
    },
    addRentCounters: (state, action: PayloadAction<CoutersProps>) => {
      state[action.payload.name] =
        action.payload.type === "decrease"
          ? state[action.payload.name] - 1
          : action.payload.type === "increase"
          ? state[action.payload.name] + 1
          : state[action.payload.name];
    },
    addRentPrice: (state, action: PayloadAction<string>) => {
      state.price = parseInt(action.payload);
    },
    setRent: (state, action: PayloadAction<RentTypes>) => {
      console.log("actionpayload", action.payload);
      state.category = action.payload.category;
      state.bathroomCount = action.payload.bathroomCount;
      state.description = action.payload.description;
      state.guestCount = action.payload.guestCount;
      state.imageSrc = action.payload.imageSrc;
      state.listingId = action.payload.listingId;
      state.location = action.payload.location;
      state.price = action.payload.price;
      state.roomCount = action.payload.roomCount;
      state.title = action.payload.title;
      state.type = action.payload.type;
    },
  },
});

export const {
  addLocation,
  addRentCounters,
  addRentTextValues,
  addRentPrice,
  setRent,
} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectRent = (state: RootState) => state.rent;

export default userSlice.reducer;
