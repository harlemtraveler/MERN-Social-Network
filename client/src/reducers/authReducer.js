import { TEST_DISPATCH } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case TEST_DISPATCH:
      return {
        ...state,
        user: action.payload // Takes payload (i.e. userData) and assigns to "user: {}"
      }
    default:
      return state;
  }
}

/*
  To take the state and just add to it (NOT permanently alter it!),
  the use the spread operator (...)
*/
