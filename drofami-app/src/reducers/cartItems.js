import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = "";

export const cartSlice = createSlice({
  name: "cart",
  initialState: { value: initialStateValue },
  reducers: {
    cartItems: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { cartItems } = cartSlice.actions;

export default cartSlice.reducer;
