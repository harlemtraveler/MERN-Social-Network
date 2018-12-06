import axios from 'axios';

import {
  POST_LOADING,
  GET_POSTS,
  GET_POST,
  ADD_POST,
  DELETE_POST,
  GET_ERRORS
} from './types';

// Add Post
export const addPost = postData => dispatch => {
  axios
  .post('/api/posts', postData)
  .then(res =>
    dispatch ({
      type: ADD_POST,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}

// Get Post
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
  .get('/api/posts')
  .then(res =>
    dispatch ({
      type: GET_POSTS,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: GET_POSTS,
      payload: null
    })
  );
}

// Delete Post
export const deletePost = id => dispatch => {
  axios
  .delete(`/api/posts/${id}`)
  .then(res =>
    dispatch ({
      type: DELETE_POST,
      // We use "id" so the reducer can delete post locally
      payload: id
    })
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}

// Add Like
export const addLike = id => dispatch => {
  axios
  .post(`/api/posts/like/${id}`)
  .then(res => dispatch(getPosts()))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}

// Remove Like
export const removeLike = id => dispatch => {
  axios
  .post(`/api/posts/unlike/${id}`)
  .then(res => dispatch(getPosts()))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}

// Set Post loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
