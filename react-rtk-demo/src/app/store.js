//store.js
//const configureStore = require("@reduxjs/toolkit").configureStore; //1.Defining the store
import { configureStore } from "@reduxjs/toolkit";

//const cakeReducer = require("../features/cake/cakeSlice");
import cakeReducer from "../features/cake/cakeSlice";

//const icecreamReducer = require("../features/icecream/icecreamSlice");
import icecreamReducer from "../features/icecream/icecreamSlice";

//const userReducer = require("../features/user/userSlice");
import userReducer from "../features/user/userSlice";

//2.Invoke the function and assign it to a constant(store)
const store = configureStore({
  //It accepts an object as argument
  //It specify all the reducers from slices that belong to features
  reducer: {
    cake: cakeReducer, //Add a key in the reducer object called cake and set it to cakeReducer
    icecream: icecreamReducer, //Similarly for icecream
    user: userReducer,
  },
  //To apply the middleware we specify the middleware property after reducer in configure store
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), //It receives a func. as its argument called getDefaultMiddleware
  //And in the func. body we implicitly return getDefaultMiddleware and concatinate the list wity the logger middleware
});

//3.Export it and make use of it in index.js to dispatch some actions
//module.exports = store;
export default store;
