//const { cakeActions } = require("../cake/cakeSlice");

//icecremSlice.js
//const createSlice = require("@reduxjs/toolkit").createSlice; //Import createSlice function from redux toolkit

import { createSlice } from "@reduxjs/toolkit";
import { ordered as cakeOrdered } from "../cake/cakeSlice";
const initialState = {
  numOfIcecreams: 20,
};

//2. Invoke the function and assign it to a constant
const icecreamSlice = createSlice({
  name: "icecream", //Adding a name for the slice
  initialState: initialState,
  reducers: {
    //Define the reducers mapping
    ordered: (state) => {
      state.numOfIcecreams--;
    },
    restocked: (state, action) => {
      state.numOfIcecreams += action.payload;
    },
  },
  //Extra reducer - It allows createSlice to add other action types besides the types it has generated
  //Approach - Using builer callback(preffered)
  extraReducers: (builder) => {
    builder.addCase(cakeOrdered, (state) => {
      state.numOfIcecreams--;
    });
  },
});
//Export the reducer as default export
//module.exports = icecreamSlice.reducer;
export default icecreamSlice.reducer;
//Export the actions as named export
//module.exports.icecreamActions = icecreamSlice.actions;
export const { ordered, restocked } = icecreamSlice.actions;
