//set el valor inicial del token
// const tokenReducer = (state=0, action)=>{
//     switch(action.type){
//         case "TOKEN":
//             console.log("hOLAAAAA ", action.payload);
//             return action.payload;
//         default:
//             console.log("ADIOOOOS");
//             return 3;
//     }
// }
// export default tokenReducer;

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