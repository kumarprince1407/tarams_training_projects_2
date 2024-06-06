//cakeSlice.js
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  numOfCakes: 10,
};

//2.Now we will invoke the function and assign it to a constant.
const cakeSlice = createSlice({
  //It accepts an object as an argument (here we are specifying 3 properties in it)
  name: "cake",
  initialState: initialState,
  //3.Specify the reducer function
  reducers: {
    //Within the reducer object, we specify the individual state transitions
    ordered: (state) => {
      state.numOfCakes--;
    },
    restocked: (state, action) => {
      state.numOfCakes += action.payload;
    },
  },
});

//Export the reducer as the default export
//module.exports = cakeSlice.reducer;
export default cakeSlice.reducer;

//Export the actions as a named export
//module.exports.cakeActions = cakeSlice.actions;//named export
export const { ordered, restocked } = cakeSlice.actions;
