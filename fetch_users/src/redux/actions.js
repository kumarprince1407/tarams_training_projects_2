//actions.js

import axios from "axios";
import {
  //Importing action types from userTypes
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
} from "./userTypes";

//Action creators - Functions that create actions(plain objects) to be dispatched, including async actions(thunks)
//This action signals that a user fetch operation has started, typically used to set a loading state in the reducer
export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

//The users
export const fetchUsersSuccess = (users) => {
  //users coming from the thunk action creator below called as 'fetchUsers'
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users, //payload property contains the actual data being sent with the action.
    //which is the 'users' array in this case
    //The 'payload' property in the action object carries the user data to the reducer.
  };
};

export const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

/*Thunk action creator: It returns a function instead of an action object, and this function can perform
side effects, like here it is performing an asynchronous operation with the help of 'redux-thunk middleware' */
export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest); //Dispatch action to indicate request has started. This will set loading to 'true'
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data; //Extract users from API response
        dispatch(fetchUsersSuccess(users)); //Dispatch success action(fetchusersSuccess) with 'users' as an argument
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchUsersFailure(errorMsg)); //Dispatch failure action with an error message
      });
  };
};
//The above thunk action creator dispatches 'fetchUsersRequest', performs an API call, and then dispatches
//either 'fetchUsersSuccess' or 'fetchUsersFailure'
