const initialState = {
  isAuthenticated: false,
  user: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    default:
      return state;
  }
}

/*
  To take the state and just add to it (NOT permanently alter it!),
  the use the spread operator (...)
*/
