
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';

// Action types
export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export const SHOW_USER_REQUEST = 'SHOW_USER_REQUEST';
export const SHOW_USER_SUCCESS = 'SHOW_USER_SUCCESS';
export const SHOW_USER_FAILURE = 'SHOW_USER_FAILURE';

export const FETCH_USER_DATA_REQUEST = 'FETCH_USER_DATA_REQUEST';
export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const FETCH_USER_DATA_FAILURE = 'FETCH_USER_DATA_FAILURE';

// Async action creator to create a user
export const createUser = (userData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_USER_REQUEST });
    try {
      const response = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to contact");
      }

      const result = await response.json();
      dispatch({ type: CREATE_USER_SUCCESS, payload: result });
    } catch (error) {
      dispatch({ type: CREATE_USER_FAILURE, payload: error.message });
    }
  };
};

// Async action creator to show user details
// export const showUser = (userData) => {
//   return async (dispatch) => {
//     dispatch({ type: SHOW_USER_REQUEST });
//     try {
//       const response = await fetch("http://localhost:3000/contact/Register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch user details");
//       }

//       const result = await response.json();
//       dispatch({ type: SHOW_USER_SUCCESS, payload: result });
//     } catch (error) {
//       dispatch({ type: SHOW_USER_FAILURE, payload: error.message });
//     }
//   };
// };
export const showUser = (userData) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_USER_REQUEST });
    try {
      const formData = new FormData();
      Object.keys(userData).forEach(key => {
        formData.append(key, userData[key]);
      });

      const response = await fetch("http://localhost:3000/contact/Register", {
        method: "POST",
        body: formData, 
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const result = await response.json();
      dispatch({ type: SHOW_USER_SUCCESS, payload: result });
    } catch (error) {
      dispatch({ type: SHOW_USER_FAILURE, payload: error.message });
    }
  };
};

// Profile.js
export const fetchUserData = (userData) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USER_DATA_REQUEST });
    try {
      // const response = await fetch("http://localhost:3000/contact", {
        const response = await fetch("localhost:3000/contact/Profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to go profile page.");
      }

      const result = await response.json();
      dispatch({ type: FETCH_USER_DATA_SUCCESS, payload: result });
    } catch (error) {
      dispatch({ type: FETCH_USER_DATA_FAILURE, payload: error.message });
    }
  };
};


const initialState = {
  users: [],
  loading: false,
  error: null,
};


const userDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
    case SHOW_USER_REQUEST:
    case FETCH_USER_DATA_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_USER_SUCCESS:
      return { ...state, loading: false, users: [...state.users, action.payload] };
    case SHOW_USER_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case FETCH_USER_DATA_SUCCESS:
      return { ...state, loading: false };
    case CREATE_USER_FAILURE:
    case SHOW_USER_FAILURE:
    case FETCH_USER_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
// Create store with thunk middleware
const store = createStore(userDetailReducer, applyMiddleware(thunk));

export default store;


