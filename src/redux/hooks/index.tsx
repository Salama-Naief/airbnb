import cartSlice from "./cartSlice";
import useLoginSlice from "./useLoginSlice";
import userSlice from "./userSlice";
import useRegisterSlice from "./useRegisterSlice";
import useRentSlice from "./useRentSlice";
import rentSlice from "./rentSlice";
import useSearch from "./useSearchSlice";

export const reducers = {
  user: userSlice,
  cart: cartSlice,
  useRegister: useRegisterSlice,
  useLogin: useLoginSlice,
  rent: rentSlice,
  useRent: useRentSlice,
  useSearch: useSearch,
};
