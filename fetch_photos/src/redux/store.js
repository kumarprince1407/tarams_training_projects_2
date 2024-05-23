import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import reducer from "./reducer";

const middleware = [thunk, logger];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
