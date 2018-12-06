import { ADD_POST, GET_POSTS, GET_POST , POST_LOADING, DELETE_POST } from '../actions/types';

const initialState = {
  posts: [],
  post: {},
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts], // payload: new, ..state.post: current
      };
    case DELETE_POST:
      return {
        ...state,
        // Delete by filtering through "posts" array by the "id" from "action.payload"
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    default:
      return state;
  }
}
