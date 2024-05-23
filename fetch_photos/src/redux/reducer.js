//reducer.js

import {
  FETCH_PHOTOS_REQUEST,
  FETCH_PHOTOS_SUCCESS,
  FETCH_PHOTOS_FAILURE,
} from "./photoTypes";

const initialState = {
  loading: false,
  photos: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PHOTOS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_PHOTOS_SUCCESS:
      return {
        ...state,
        loading: false,
        photos: action.payload,
        error: "",
      };

    case FETCH_PHOTOS_FAILURE:
      return {
        ...state,
        loading: false,
        photos: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
