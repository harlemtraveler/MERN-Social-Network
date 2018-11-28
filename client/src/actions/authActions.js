import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
// Decodes (destructures) JWT tokens
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User - the "history" arguement is the "this.props.history" param passed from component
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to local storage
      const { token } = res.data;

      // Set token to local storage
      localStorage.setItem('jwtToken', token);

      // Set token to Auth header - tokens need the "Auth" header to be usable
      setAuthToken(token);

      // Decode token to get user data
      const decoded = jwt_decode(token);

      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set Logged-in User
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');

  // Remove auth header for future request
  setAuthToken(false);

  // Set current user to {} (an empty object) which'll set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

/*
  - When fteching from back-end, we need to wait for response from backend, then we can dispatch
  - The "thunk" middleware will be useful for this (also add "dispatch" to function).
  - When performing an asynchronous AJAX request, we can't simply return the error. We must call the "dispatch" function.

  - We can store data into local storage by using the "localStorage.setItem()" method

      localStorage.setItem(myDataToSave);
*/
