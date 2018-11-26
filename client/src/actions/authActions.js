import axios from 'axios';
import { GET_ERRORS } from './types';

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
/*
  - When fteching from back-end, we need to wait for response from backend, then we can dispatch
  - The "thunk" middleware will be useful for this (also add "dispatch" to function).
  - When performing an asynchronous AJAX request, we can't simply return the error. We must call the "dispatch" function.
*/
