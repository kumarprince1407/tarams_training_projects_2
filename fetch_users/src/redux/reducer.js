//reducer.js
import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
} from "./userTypes";

//default state of the reducer
const initialState = {
  loading: false,
  users: [],
  error: "",
};

//the 'reducer' function takes the current state and an action, that returns a new state based
//on the action type. It handles state changes for each of the defined action types
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false, //set loading to false, indicating the 'fetch' operation is complete

        users: action.payload, //Update the 'users' property in state with the user data
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,

        users: [],
        error: action.payload,
      };
    default:
      return {
        state,
      };
  }
};

export default reducer;
