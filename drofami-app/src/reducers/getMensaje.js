import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = "";

export const mensajeSlice = createSlice({
  name: "mensaje",
  initialState: { value: initialStateValue },
  reducers: {
    setMensaje: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setMensaje } = mensajeSlice.actions;

export default mensajeSlice.reducer;