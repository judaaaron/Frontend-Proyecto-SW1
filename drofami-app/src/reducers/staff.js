import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = "";

export const staffSlice = createSlice({
  name: "staff",
  initialState: { value: initialStateValue },
  reducers: {
    isStaff: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { isStaff } = staffSlice.actions;

export default staffSlice.reducer;
