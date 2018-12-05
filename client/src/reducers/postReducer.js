import { ADD_POST } from '../actions/types';

const initialState = {
  posts: [],
  post: {},
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts], // payload: new, ..state.post: current
        loading: true
      }
    default:
      return state;
  }
}
