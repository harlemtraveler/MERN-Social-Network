const initialState = {
  posts: [],
  post: {},
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    // case PROFILE_LOADING:
    //   return {
    //     ...state,
    //     loading: true
    //   }
    default:
      return state;
}
