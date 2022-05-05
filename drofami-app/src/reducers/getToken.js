import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = "";

export const tokenSlice = createSlice({
  name: "token",
  initialState: { value: initialStateValue },
  reducers: {
    setToken: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;